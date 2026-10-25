const { MCP } = require('../lib/mcp');
const { Ping } = require('../mcp/tools/ping');

module.exports = (server, options, done) => {
	const mcp = new MCP({
		name: process.env.MCP_SERVER_NAME || 'jsmrcaga/mcp',
		version: process.env.MCP_SERVER_VERSION || 'v0.0.1'
	});

	mcp.tool(new Ping());

	server.get('/', () => {
		return {
			ok: true,
			type: 'mcp'
		}
	});

	server.post('/', (req, reply) => {
		// Call MCP server
		return mcp.handle(req.body).then(res => res).catch(e => {
			console.error("MCP ERROR", {e});
			if(e instanceof Error) {
				return reply.status(500).send({
					error: e.message,
					details: e
				});
			}

			return reply.status(400).send(e);
		});
	});

	done();
}
