const fs = require('node:fs/promises')
const handler = require('./lib/handler');

const callback = (err, { statusCode, body }) => {
	if(err) {
		throw err;
	}

	if(statusCode !== 200) {
		throw new Error('Bad status code ' + statusCode);
	}

	return fs.writeFile(`./test/${new Date().toISOString()}.svg`, Buffer.from(body, 'base64')).then(() => {
		console.log('DONE');
	});
};

handler({
		rawPath: '/spotfy.svg'
	},
	{},
	callback
);
