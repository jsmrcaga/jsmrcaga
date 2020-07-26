const Component = require('./component');

class Quote extends Component {
	constructor({ text='' }) {
		super();
		this.text = text;
	}

	render() {
		return `> ${this.text}`;
	}
}

module.exports = Quote;
