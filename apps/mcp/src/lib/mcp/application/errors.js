class MCPError extends Error {
	code = null;

	toJSON() {
		return {
			code: this.code,
			message: this.message,
			data: this.data || {}
		};
	}
}

class MCPToolNotExistsError extends MCPError {
	code = -32602;

	constructor(tool_name, ...options) {
		super(`Tool ${tool_name} does not exist`, ...options);
	}
}

module.exports = {
	MCPError,
	MCPToolNotExistsError
};
