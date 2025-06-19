module.exports = (server, options, done) => {
	server.register(require('./webhooks'), {
		prefix: '/webhooks'
	});

	server.register(require('./plasma'), {
		prefix: '/api/plasma'
	});

	done();
};
