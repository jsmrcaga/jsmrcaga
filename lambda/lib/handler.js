const Spotify = require('./spotify');
const SVG = require('./svg');

const respond = (data, status=200) => {
	return {
		statusCode: status,
		headers: {
			'Content-Type': 'image/svg+xml',
			'Cache-Control': 'no-cache'
		},
		body: Buffer.from(data).toString('base64'),
		isBase64Encoded: true
	};
}


const handler = (event, context, callback) => {
	Spotify.refreshToken().then(() => {
		return Spotify.currentTrack();
	}).then(track => {
		if(!track) {
			track = {
				artist: '',
				name: 'Nothing playing...',
				image: 'https://www.pngitem.com/pimgs/m/493-4931443_border-squares-square-shadow-shadows-ftestickers-png-white.png'
			}
		}

		return SVG.create(track);
	}).then(svg => {
		// Respond from lambda
		return callback(null, respond(svg));
	}).catch(e => {
		console.error(e);
		return callback(e, respond('Server Error', 500));
	});
};

module.exports = handler;
