const Component = require('./component');

const PREFIX = {
	h1: '#',
	h2: '##',
	h3: '###',
	h4: '####',
	h5: '#####',
	h6: '######'
}

class Title extends Component {
	constructor({ type='h1', text='' }) {
		super();
		this.type = type;
		this.text = text;
	}

	render() {
		return `${PREFIX[this.type]} ${this.text}`;
	}
}

module.exports = Title;
