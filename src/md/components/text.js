const Component = require('./component');

class Text extends Component {
	constructor({ text=''}) {
		super();
		this.text = text;
	}

	render() {
		if(Array.isArray(this.text)) {
			// Render children recursively
			return this.text.reduce((str, node) => {
				if(node instanceof Component) {
					str += node.render();
					return str;
				}

				return str + node;
			}, '');
		}
		return this.text;
	}
}

module.exports = Text;
