const Component = require('./component');

class Link extends Component {
	constructor({ text='', href='', html=false }) {
		super();
		this.text = text;
		this.href = href;
		this.html = html;
	}

	render() {
		if(this.html) {
			return `<a href="${this.href}" target="_blank">${this.text instanceof Component ? this.text.render() : (this.text || this.href)}</a>`
		}

		return `[${this.text || this.href}](${this.href})`;
	}
}

module.exports = Link;
