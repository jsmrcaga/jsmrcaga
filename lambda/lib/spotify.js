const fishingrod = require('fishingrod');

class Spotify {
	constructor() {
		this.client_id = process.env.SPOTIFY_CLIENT_ID;
		this.client_secret = process.env.SPOTIFY_CLIENT_SECRET;
		this.refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
		// AQDPwlpYhL52Q-s86jDljRl-0jDAk9V2yVQdQNE_j4dt_j4MHwLNYfqQTX1FSuNMs4Xj4urruYxttSonQJJWQGVWcxzgyKKdXLVP_tx9gjKjrCZG2NaUUI9UCeUzsIf4Obw
		this.token = null;
	}

	auth() {
		return Buffer.from(`${this.client_id}:${this.client_secret}`).toString('base64');
	}

	refreshToken() {
		return fishingrod.fish({
			method: 'POST',
			host: 'accounts.spotify.com',
			path: '/api/token',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${this.auth()}`
			},
			data: {
				grant_type: 'refresh_token',
				refresh_token: this.refresh_token
			}
		}).then(({ response }) => {
			this.token = JSON.parse(response).access_token;
		});
	}

	currentTrack() {
		return fishingrod.fish({
			method: 'GET',
			host: 'api.spotify.com',
			path: '/v1/me/player/currently-playing',
			headers: {
				Authorization: `Bearer ${this.token}`
			}
		}).then(({ status, response }) => {
			if(status === 204) {
				return null;
			}

			let { item } = JSON.parse(response);
			return {
				image: item.album.images[0].url,
				artist: item.artists[0].name,
				name: item.name
			};
		});
	}
}

module.exports = new Spotify();
