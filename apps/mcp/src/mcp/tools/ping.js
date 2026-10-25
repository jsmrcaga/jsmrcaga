const { Tool } = require('../../lib/mcp');

class Ping extends Tool {
	static NAME = 'ping';
	static DESCRIPTION = 'A simple ping/pong tool to test this MCP server';

	static SCHEMA = {
		type: 'object',
		required: ['score'],
		properties: {
			score: {
				type: 'number'
			}
		}
	};

	run(params) {
		const { score } = params;
		return {
			score: score + 1,
		};
	}
}

module.exports = { Ping };
