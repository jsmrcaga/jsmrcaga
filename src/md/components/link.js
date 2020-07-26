const Component = require('./component');

class Link extends Component {
	constructor({ text='', link='' }) {
		super();
		this.text = text;
		this.link = link;
	}

	render() {
		return `[${this.text || this.link}](${this.link})`;
	}
}

module.exports = Link;
