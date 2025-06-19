const { storage } = require('../db/storage');

const HEADER_TELEGRAM_TOKEN = 'X-Telegram-Bot-Api-Secret-Token';

class TelegramCommands {
	constructor({ telegram_client }) {
		this.telegram_client = telegram_client;
	}

	chat_id(message) {
		const chat_id = message.chat?.id;

		if(!chat_id) {
			throw new Error('No chat id in message');
		}

		return storage.upsert_chat_id({
			telegram_chat_id: chat_id
		}).then(() => {
			return this.telegram_client.send_message({
				chat_id,
				text: `\_Your chat id is\_:\n\n\`\`\`\n${chat_id}\n\`\`\``,
				parse_mode: 'MarkdownV2'
			});
		});
	}

	pin(message) {
		// somehow connect to the instance and input the pin
		return this.telegram_client.send_message({
			chat_id,
			text: `Not yet supported, we're working on it!`
		});
	}

	subscribe(message) {
		// store chat_id and username in Supabase
		const chat_id = message.chat?.id;

		if(!chat_id) {
			throw new Error('No chat id in message');
		}

		return storage.upsert_chat_id({
			telegram_chat_id: chat_id,
			is_subscribed: true
		}).then(() => {
			return this.telegram_client.send_message({
				chat_id,
				text: `✅ Done! You will receive messages on new releases and newsletter posts`,
			});
		});
	}

	unsubscribe(message) {
		// store chat_id and username in Supabase
		const chat_id = message.chat?.id;

		if(!chat_id) {
			throw new Error('No chat id in message');
		}

		return storage.upsert_chat_id({
			telegram_chat_id: chat_id,
			is_subscribed: false
		}).then(() => {
			return this.telegram_client.send_message({
				chat_id,
				text: `Sad to see you go 🤖. You are no longer subscribed!`,
			});
		});
	}
}

class Telegram {
	constructor({ bot_token, secret_token }) {
		this.bot_token = bot_token;
		this.secret_token = secret_token;

		this.commands = new TelegramCommands({
			telegram_client: this
		});
	}

	#validate_token(received_token) {
		if(received_token !== this.secret_token) {
			throw new Error('Invalid token');
		}
	}

	call_method(tg_method, data, verb='POST') {
		const params = {
			method: verb,
			headers: {}
		};

		if(verb !== 'GET') {
			params.body = data instanceof Object ? JSON.stringify(data) : data;
			params.headers['Content-Type'] = 'application/json'
		}

		return fetch(`https://api.telegram.org/bot${this.bot_token}/${tg_method}`, params).then(res => {
			if(res.ok) {
				return res.json();
			}

			return res.text().then(text => {
				const error = new Error('Bad telegram response');
				error.response = text;
				error.headers = res.headers;
				throw error;
			});
		});
	}

	send_message({
		chat_id,
		text,
		...rest
	}) {
		return this.call_method('sendMessage', {
			chat_id,
			text,
			...rest
		});
	}

	handle({ body, headers: http_headers }) {
		const headers = new Headers(http_headers);
		if(headers.get(HEADER_TELEGRAM_TOKEN)) {
			try {
				this.#validate_token(headers.get(HEADER_TELEGRAM_TOKEN));
			} catch(e) {
				return Promise.reject(e);
			}
		}

		// Check for commands items
		if(!body.message) {
			return Promise.resolve();
		}

		const chat_id = body.message?.chat.id;

		// Cannot answer anyway
		if(!chat_id) {
			return Promise.resolve();
		}

		// https://core.telegram.org/bots/api#messageentity
		for(const entity of body.message?.entities || []) {
			if(entity.type === 'bot_command') {
				let command = body.message.text.substr(entity.offset, entity.length);
				command = command.replace(/\//g, '');

				if(this.commands[command]) {
					try {
						return this.commands[command](body.message).catch(e => {
							console.error(`Command ${command} errored:`, e);
							return this.send_message({
								chat_id,
								text: `Hmm something went wrong. We've been notified; please try again in a few minutes`,
							});
						});
					} catch(e) {
						return Promise.reject(e);
					}
				}
			}
		}

		return this.send_message({
			chat_id,
			text: 'Sorry, did not catch that. Try using the menu 👾'
		});
	}

}

module.exports = {
	Telegram
};
