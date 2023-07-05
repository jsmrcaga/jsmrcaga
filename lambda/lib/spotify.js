class Spotify {
	constructor() {
		this.client_id = process.env.SPOTIFY_CLIENT_ID;
		this.client_secret = process.env.SPOTIFY_CLIENT_SECRET;
		this.refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
		this.token = null;
	}

	auth() {
		return Buffer.from(`${this.client_id}:${this.client_secret}`).toString('base64');
	}

	refreshToken() {
		const data = new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: this.refresh_token
		});

		return fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${this.auth()}`
			},
			body: data.toString()
		}).then(response => response.json()).then(({ access_token }) => {
			this.token = access_token;
		});
	}

	currentTrack() {
		return fetch('https://api.spotify.com/v1/me/player/currently-playing', {
			headers: {
				Authorization: `Bearer ${this.token}`
			}
		}).then(response => {
			if(response.status === 204) {
				return null;
			}

			if(!response.ok) {
				throw new Error(`Spotify response: ${response.status}`);
			}

			return response.json();
		}).then(response => {
			if(!response) {
				return null;
			}

			console.log('Response', response, this);

			const { item } = response;
			return {
				image: item.album.images[0].url,
				artist: item.artists[0].name,
				name: item.name,
				url: item.external_urls.spotify
			};
		});
	}
}

module.exports = new Spotify();
