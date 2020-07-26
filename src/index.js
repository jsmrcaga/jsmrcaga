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
	text: 'Feel free to roam around!'
}));

readme.end();
