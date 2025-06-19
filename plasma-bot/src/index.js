const { server } = require('./server');

server.listen({
	host: process.env.HOST || '0.0.0.0',
	port: process.env.PORT || 3000
}).then(iface => {
	console.log('Server listening on', iface);
}).catch(e => {
	console.error('FATAL', e);
	throw e;
});
