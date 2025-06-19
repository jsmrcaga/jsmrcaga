module.exports = (server, options, done) => {
	server.addHook('onRequest', (req, reply, next) => {
		// Check API key
		const headers = new Headers(req.headers);
		const auth_header = headers.get('Authorization');
		if(!auth_header) {
			return reply.status(403).send();
		}

		const [type, api_key] = auth_header.split(' ');
		console.log({ type, api_key, p: process.env.PLASMA_API_KEY });
		if(type !== 'Token') {
			return reply.status(403).send();
		}

		if(!api_key) {
			return reply.status(404).send();
		}

		if(api_key !== process.env.PLASMA_API_KEY) {
			return reply.status(403).send();
		}

		next();
	});

	server.post('/ad', (req, reply, done) => {
		return reply.status(501).send();
	});

	done();
};
