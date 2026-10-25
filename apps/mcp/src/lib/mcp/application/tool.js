const Ajv = require('ajv');
const { MCPError } = require('./errors');
/**
 * @category MCP/Application
 * @class Tool - an MCP tool
 */
class Tool {
	/**
	 * @static
	 * @member {string}
	 */
	static NAME = null;

	/**
	 * @static
	 * @member {string}
	 */
	static DESCRIPTION = null;

	/**
	 * @static
	 * @member {JSONSchema<Object>}
	 */
	static SCHEMA = null;
	static COMPILED_SCHEMA = null;

	/**
	 * 
	 */
	constructor() {}

	/**
	 * Calls the tool. Async by default
	 * @param {Object} params - The params passed to the tool
	 * @return {Promise<void>}
	 */
	call(params) {
		this.validate_params(params);
		return this.run(params);
	}

	/**
	 * Validates the parameters for the tool against the schema
	 * @throws If the params are not valid
	 */
	validate_params(params) {
		if(!this.constructor.COMPILED_SCHEMA) {
			const ajv = new Ajv();
			this.constructor.COMPILED_SCHEMA = ajv.compile(this.constructor.SCHEMA);
		}

		const validator = this.constructor.COMPILED_SCHEMA;
		const valid = validator(params);

		if(!valid) {
			const error = new MCPError('Invalid arguments passed to tool');
			error.data = validator.errors;
			throw error;
		}
	}

	/**
	 * Runs the tool
	 * @param {Object} params - The params passed to the tool
	 */
	run(params) {
		throw new Error('Tool#run must be overriden');
	}

	/**
	 * Formats the tool to be returned in an MCP server
	 */
	static mcp_format() {
		return {
			name: this.NAME,
			description: this.DESCRIPTION,
			// default as per spec
			// @see https://modelcontextprotocol.io/specification/2026-07-28/server/tools#tool-with-no-parameters
			inputSchema: this.SCHEMA || {
				type: "object",
				additionalProperties: false
			}
		}
	}
}

module.exports = {
	Tool
};
