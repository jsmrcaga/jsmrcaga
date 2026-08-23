// oauth process:
// - 1/ generate url
// - 2/ login
// - 3/ redirect to localhost
// - 4/ get token
const fastify = require('fastify');
const Process = require('node:child_process');
const spotify = require('../lib/spotify');

const server = fastify();

const redirect_uri_endpoint = '127.0.0.1';
const port = 1234;

server.get('/url', (req, reply) => {
	// 1/ generate url
	const oauth_url = spotify.getOauthUrl({
		redirect_uri_endpoint,
		port,
		path: '/oauth'
	});
	console.log('Redirecting to', oauth_url);
	// 2/ login
	return reply.redirect(oauth_url, 302);
});

server.get('/oauth', (req, reply) => {
	// 4/ exchange code
	return spotify.exchangeCode({
		code: req.query.code,
		redirect_uri_endpoint,
		port,
		path: '/oauth'
	}).then(response => {
		console.log('Spotify code\n', response);
		process.exit(1);
	});
});

function main() {
	return server.listen({
		host: '0.0.0.0',
		port: 1234
	}).then((iface) => {
		console.log(`Listening on ${iface}`);
		Process.exec(`open http://127.0.0.1:1234/url`);
	});
}

if(require.main === module) {
	return main();
}
