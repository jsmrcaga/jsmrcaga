const fs = require('fs');

const { Title, Quote, Table, Image, Link, Text } = require('./components');

class Markdown {
	constructor({ filename='README.md' }={}) {
		this.filename = filename;
		this.file = fs.createWriteStream(`./${this.filename}`);
	}

	add(section) {
		let str = section.render();
		// Double line jump to separate each node
		this.file.write(`\n\n${str}`);
	}

	end() {
		this.file.end();
	}
}

Markdown.Title = Title;
Markdown.Quote = Quote;
Markdown.Table = Table;
Markdown.Image = Image;
Markdown.Link = Link;
Markdown.Text = Text;

module.exports = Markdown;
