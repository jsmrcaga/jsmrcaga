const { MCP } = require('./mcp');

const { ...application } = require('./application');

module.exports = {
	MCP,
	...application
};
