const { Telegram } = require('./telegram');

const telegram = new Telegram({
	bot_token: process.env.TELEGRAM_BOT_TOKEN,
	secret_token: process.env.TELEGRAM_SECRET_TOKEN
});

module.exports = { telegram };
