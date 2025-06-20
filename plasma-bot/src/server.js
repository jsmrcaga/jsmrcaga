const fastify = require('fastify');

const server = fastify();

server.get('/health', () => {
	return { ok: true };
});

server.register(require('./routes'));

server.setErrorHandler((error, req, reply) => {
	if(error.code === 'FST_ERR_VALIDATION') {
		return reply.status(400).send({
			errors: error.validation
		});
	}

	console.log(error);

	// Fastify default errors
	if(error.statusCode) {
		return reply.status(error.statusCode).send(error.message);
	}

	reply.status(500).send();
});

module.exports = {
	server
};
