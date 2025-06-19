const { telegram } = require('../../lib/telegram');
const { storage } = require('../../lib/db/storage');

module.exports = (server, options, done) => {
	server.post('/ready', {
		schema: {
			body: {
				type: 'object',
				properties: {
					chat_id: { type: 'string' },
					host_ip: { type: 'string' }
				},
				required: ['chat_id']
			}
		}
	}, (req, reply) => {
		// Server is ready

		let notif = `Plasma is ready to use\\!`;
		if(req.body.host_ip) {
			notif += `\n\nConnect Moonlight to \n\`\`\`\n${req.body.host_ip}\n\`\`\``;
		}

		// Send notif
		return telegram.send_message({
			chat_id: req.body.chat_id,
			text: notif,
			parse_mode: 'MarkdownV2'
		}).then(() => {
			// Update last ip of chat-id
			const headers = new Headers(req.headers);
			return storage.upsert_chat_id({
				telegram_chat_id: req.body.chat_id,
				// we cannot use host ip because it's probably the local network
				last_ip: headers.get('Host')
			});
		});
	});

	server.register(require('./private'), {
		prefix: '/private'
	})

	done();
};
