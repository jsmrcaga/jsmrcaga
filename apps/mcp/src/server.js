const fastify = require('fastify');
const Sentry = require('@sentry/node');

let pino_options = {
	level: process.env.MCP_LOG_LEVEL,
	errorKey: 'error',
	formatters: {
		level: (label) => ({ level: label })
	},
};

// Use pretty logs in local/staging
if(process.env.NODE_ENV !== 'production') {
	pino_options = {
		...pino_options,
		transport: {
			target: 'pino-pretty',
			options: {
				colorize: true
			}
		}
	};
}

const server = fastify({
	logger: pino_options,
	ajv: {
		plugins: [
			(ajv) => {
				ajv.addFormat('isodate', /\d{4}-[0-1][0-9]-[0-3][0-9]T(0\d|1\d|2[0-3]):[0-5][0-9]:[0-5][0-9].\d{3}Z/);
				ajv.addFormat('email', /^[a-zA-Z0-9\.\-_]{1,}@[a-zA-Z0-9\.\-_]{1,}\.[a-zA-Z0-9]{2,}$/)
				return ajv;
			}
		]
	}
});

server.get('/health', (req, reply) => {
	return {
		ok: true
	}
});

server.post('/ping', (req, reply) => {
	return 'pong';
});

server.register(require('./routes/mcp'), {
	prefix: '/mcp'
})

server.setErrorHandler((error, req, reply) => {
	if(error.code === 'FST_ERR_VALIDATION') {
		return reply.status(400).send({
			errors: error.validation
		});
	}

	console.error(error);
	Sentry.captureException(error);

	reply.status(500).send();
});

module.exports = {
	server
}
