const Spotify = require('./spotify');
const SVG = require('./svg');

const respond = (data) => {
	return {
		statusCode: 200,
		headers: {
			'Content-Type': 'image/svg+xml'
		},
		body: Buffer.from(data).toString('base64'),
		isBase64Encoded: true
	};
}


const handler = (event, context, callback) => {
	Spotify.refreshToken().then(() => {
		return Spotify.currentTrack();
	}).then(track => {
		let svg = '';

		if(track) {
			svg = SVG.create(track);
		}

		// Respond from lambda
		return callback(null, respond(svg));
	});
};

module.exports = handler;
