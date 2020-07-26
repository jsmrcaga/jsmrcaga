const Component = require('./component');

class Image extends Component {
	constructor({ src='', ...rest }) {
		super();
		this.src = src;
		this.params = rest;
	}

	render() {
		let prefix = `<img`;
		let query = '';
		if(this.params && Object.keys(this.params).length) {
			for(let [k, v] of Object.entries(this.params)) {
				query += `${k}="${v}" `;
			}
		}

		return `${prefix} ${query} src=${this.src}/>`;
	}
}

module.exports = Image;
