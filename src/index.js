const Markdown = require('./md/markdown');
const { Title, Text, Quote, Link, Image } = Markdown;

let readme = new Markdown();

readme.add(new Title({
	type: 'h1',
	text: '👋🏼 Hi! I\'m Jo!'
}));

readme.add(new Text({
	text: 'Thanks for visiting my GitHub profile! This readme is generated automatically, if you see any incoherences please open an issue on my @jsmrcaga/jsmrcaga repo 😉'
}));

readme.add(new Quote({
	text: 'What I\'m currently listening to:'
}));

readme.add(new Image({
	src: 'https://0v23gxo0l1.execute-api.eu-west-3.amazonaws.com/default/spotify.svg',
}));

readme.add(new Text({
	text: 'If you want to know more you can read my resume on [resume.md](/resume.md)'
}));

readme.end();
