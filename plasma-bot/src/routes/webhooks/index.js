const { telegram } = require('../../lib/telegram');

module.exports = (server, options, done) => {
	server.post('/telegram', (req, reply) => {
		return telegram.handle({
			body: req.body,
			headers: req.headers
		});
	});

	done();
};
