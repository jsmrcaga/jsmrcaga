const { server } = require('./server');

server.listen({
	host: '0.0.0.0',
	port: process.env.PORT || 3000
}).then(network_interface => {
	console.log('Server listening on', network_interface);
}).catch(e => {
	console.error(e);
	throw e;
});
