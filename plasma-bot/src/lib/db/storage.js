class Storage {
	constructor({ api_key, db_host }) {
		this.api_key = api_key;
		this.db_host = db_host;
	}

	upsert_chat_id({
		telegram_chat_id,
		is_subscribed = undefined,
		last_ip = undefined,
	}, {
		silently_fail = true
	} = {}) {
		const body = JSON.stringify({
			telegram_chat_id,
			is_subscribed,
			last_ip
		});

		return fetch(`${this.db_host}/rest/v1/plasma_users?telegram_chat_id=eq.${telegram_chat_id}`, {
			method: 'PUT',
			headers: {
				apikey: this.api_key,
				Authorization: `Bearer ${this.api_key}`,
				'Content-Type': 'application/json',
				Prefer: 'return=minimal, resolution=merge-duplicates'
			},
			body
		}).then((res) => {
			if(res.ok) {
				return;
			}

			return res.text().then(text => {
				const error = new Error('Bad Supabase response');
				error.response = text;
				error.headers = res.headers;
				error.body = body;
				throw error;
			});
		}).catch(e => {
			if(silently_fail) {
				console.error('Supabase error', e);
				return;
			}

			throw e;
		});
	}
}

const storage = new Storage({
	api_key: process.env.SUPABASE_API_KEY,
	db_host: process.env.SUPABASE_URL
});

module.exports = { storage };
