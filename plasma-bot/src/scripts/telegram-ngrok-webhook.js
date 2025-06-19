const { telegram } = require('../lib/telegram');

console.log('Fetching ngrok tunnels...');
return fetch('http://ngrok:4040/api/tunnels').then(res => {
	if(!res.ok) {
		return res.text().then(text => {
			const error = new Error('ngrok error');
			error.response = text;
			error.headers = res.headers;

			throw error;
		});
	}

	return res.json();
}).then(({ tunnels }) => {
	const [ tunnel ] = tunnels;
	const { public_url } = tunnel;

	console.log('Found ngrok tunnel', public_url);
	console.log('Setting telegram webhook...');
	return telegram.call_method('setWebhook', {
		url: `${public_url}/webhooks/telegram`,
		allowed_updates: ['message'],
	});
}).then(res => {
	console.log(res);
	console.log('\u001b[42;1m\u001b[48;5;16m DONE \u001b[0m');
});;
