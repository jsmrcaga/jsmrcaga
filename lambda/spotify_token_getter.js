const fishingrod = require('fishingrod');
const app = require('express')();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTOFY_CLIENT_SECRET;
const PORT = 1234;

app.get('/', (req, res) => {
	// Ask for code
	if(!req.query.code) {
		return res.end('ERROR');
	}

	const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

	fishingrod.fish({
		debug: true,
		method: 'POST',
		host: 'accounts.spotify.com',
		path: '/api/token',
		headers: {
			Authorization: `Basic ${auth}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: {
			grant_type: 'authorization_code',
			code: req.query.code,
			redirect_uri: `http://localhost:${PORT}`
		}
	}).then(({ response }) => {
		console.log('RESPONSE', response);
		res.end(JSON.stringify(response));
	});
});

app.get('/redirect', (req, res, next) => {
	const scopes = ['user-read-currently-playing', 'user-read-private', 'user-read-email'];
	const scope = encodeURIComponent(scopes.join(' '));
	let url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost:${PORT}&scope=${scope}`;
	res.redirect(url);
});

app.listen(PORT);
