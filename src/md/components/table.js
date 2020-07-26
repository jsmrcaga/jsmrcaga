const Component = require('./component');

class Table extends Component {
	constructor({ headers=[], rows=[] }) {
		super();
		this.rows = rows;
		let max_x = rows.reduce((max, v) => v.length > max ? v.lengh : max);

		// Fill missing headers with blank ones
		this.headers = headers;
		if(this.headers.length < max_x) {
			for(let i = 0; i < max_x - this.headers.length; i++) {
				// Empty html comments
				this.headers.push('<!-- -->');
			}
		}
	}

	render() {
		let headers = this.headers.reduce((str, header) => {
			let header_render = header instanceof Component ? header.render() : header;
			return str += `| ${header_render} |`;
		});

		let aligners = this.headers.reduce((str, header) => {
			if(!header.align) {
				return str + '|--|';
			}

			switch(header.align){
				case 'center':
					return str + '|:--:|';
				case 'center':
					return str + '|:--:|';
				case 'left':
					return str + '|:--|';
				case 'right':
					return str + '|--:|';
				default:
					return str + '|:--:|';
			}
		});

		let rows = this.rows.reduce((str, row) => {
			let row_render = row.reduce((r, cell) => {
				let cell_render = cell instanceof Component ? cell.render() : cell;
				return str += `| ${cell_render} |`;
			});

			return `${str}\n${row_render};`
		});

		return `${headers}\n${aligners}\n${rows}`;
	}
}

module.exports = Table;
