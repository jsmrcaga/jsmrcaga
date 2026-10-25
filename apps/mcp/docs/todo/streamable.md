# TODO (v2): Streamable responses & notifications

v1 answers every request with a plain `application/json` response. This note
describes how to add streamed (SSE) responses later, for long-running tools
that want to report progress.

## How it works (spec 2026-07-28)

- Every client message is its own `POST /mcp`.
- For each **request**, the server picks the response format:
  - `application/json`: a single JSON-RPC response (v1 behaviour), or
  - `text/event-stream`: an SSE stream *scoped to that request*, carrying
    related notifications (e.g. `notifications/progress`) and ending with the
    final JSON-RPC response.
- **Notifications** (no `id`) get `202 Accepted` with no body.
- Progress is opt-in: only send `notifications/progress` if the client sent
  `params._meta.progressToken`.
- **Cancellation** = the client closes the stream. After that the server MUST
  NOT send anything else for that request.
- Messages on a request stream MUST relate to that request. Change
  notifications (`list_changed`, etc.) only go on a `subscriptions/listen`
  stream (out of scope here).
- Send `X-Accel-Buffering: no` so proxies don't buffer events. For long-lived
  streams, send `:\n\n` comment lines as keep-alives.

## Fastify example

`reply.hijack()` tells Fastify to stop managing the response, so we can write
to the raw Node response (`reply.raw`). Do auth and header validation **before**
hijacking: `onSend` hooks and serialization won't run afterwards.

```js
// SSE frame: "data: <json>\n\n"
const sse = (res, msg) => res.write(`data: ${JSON.stringify(msg)}\n\n`);

fastify.post('/mcp', async (request, reply) => {
  const msg = request.body;

  // Notification (no id) → 202, no body
  if (msg.id === undefined) return reply.code(202).send();

  // Simple case → plain JSON
  if (msg.method === 'tools/list') {
    return { jsonrpc: '2.0', id: msg.id, result: { tools: [] } };
  }

  // Streaming case
  reply.hijack();
  const res = reply.raw;
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'X-Accel-Buffering': 'no',
  });

  // Client closing the stream = cancellation
  const ac = new AbortController();
  res.on('close', () => ac.abort());

  const progressToken = msg.params?._meta?.progressToken;

  try {
    for (let i = 1; i <= 3; i++) {
      await doWork({ signal: ac.signal });
      if (ac.signal.aborted) return;
      if (progressToken !== undefined) {
        sse(res, {
          jsonrpc: '2.0',
          method: 'notifications/progress',
          params: { progressToken, progress: i, total: 3, message: `step ${i}` },
        });
      }
    }
    sse(res, { jsonrpc: '2.0', id: msg.id, result: { content: [{ type: 'text', text: 'done' }] } });
  } catch (err) {
    if (!ac.signal.aborted) {
      sse(res, { jsonrpc: '2.0', id: msg.id, error: { code: -32603, message: err.message } });
    }
  } finally {
    res.end(); // final response terminates the stream
  }
});
```

## Possible design

Wrap this in a helper that passes tools a context object such as
`{ signal, progress(n, total, message) }`. The MCP route then chooses JSON vs
SSE depending on whether the tool needs to stream.
