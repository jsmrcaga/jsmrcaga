const { Server } = require('./application');
const { Tool } = require('./application');

/**
 * @category MCP
 * @class MCP - An MCP handler & registry of tools, resources etc
 */
class MCP {
	static SUPPORTED_VERSIONS = [];

	/**
	 * Creates a new MCP handler/registry
	 * @param {Object} init - The init values
	 * @param {string} init.name - the server name
	 * @param {string} init.version - the server version
	 * @param {Object} init.extensions - the extensions accepted in this server
	 */
	constructor({ name, version, extensions }) {
		this.name = name;
		this.version = version;

		this.clients = [];

		this.tools = {};
		this.resources = {};
		this.prompts = {};
		this.extensions = {};

		this.server = new Server();

		this.MCP_METHOD_MAP = {
			'server/discover': (params) => {
				return this.server.discover({
					supported_versions: [],
					tools: this.tools,
					resources: this.resources,
					prompts: this.prompts,
					extensions: this.extensions
				});
			},
			'resources/list': (params) => {
				return this.server.resource_list(this.resources);
			},
			'resources/read': (params) => {
				return this.server.resource_read(this.resources);
			},
			'resources/templates/list': (params) => {
				return this.server.resource__template_list(this.resources);
			},
			'tools/list': (params) => {
				return this.server.tool_list(this.tools);
			},
			'tools/call': (params) => {
				return this.server.tool_call(this.tools, params);
			},
			'subscriptions/listen': (params) => {
				throw new Error('Cannot subscribe just yet');
			}
		};
	}

	/**
	 * Handles an mcp request
	 * @param {MCPMessage} message
	 * @return {Promise<any>}
	 */
	handle(message) {
		const { id, method, params={} } = message;
		const { _meta } = params;

		if(!id || !method || !params) {
			const error = new Error('Invalid MCP message, missing id, method, params');
			error.received_message = message;
			return Promise.reject(error);
		}

		const handler = this.MCP_METHOD_MAP[method];

		if(!handler) {
			return Promise.reject(new Error(`Unknown mcp method "${method}"`));
		}

		let result;
		try {
			result = handler(params);
		} catch(error) {
			return Promise.reject(this.format_error(id, error));
		}

		if(result instanceof Promise) {
			return result.then(data => {
				return this.format_response(id, data);
			}).catch(error => {
				return this.format_error(id, error);
			});
		}

		return Promise.resolve(this.format_response(id, result));
	}

	/**
	 * Formats the response in JSON-RPC 2.0
	 * @param {string|number} id - The request ID
	 * @param {Object} result - The request result
	 * @return {MCPResponse} Response
	 */
	format_response(id, result) {
		const server_info = this.server.server_info({ name: this.name, version: this.version });

		return {
			id,
			jsonrpc: '2.0',
			result: {
				_meta: {
					...server_info
				},
				...result
			}
		}
	}

	/**
	 * Formats the response in JSON-RPC 2.0
	 * @param {string|number} id - The request ID
	 * @param {Error} error - The error that needs formatting
	 * @return {MCPResponse} Response
	 */
	format_error(id, error) {
		return {
			id,
			jsonrpc: '2.0',
			error
		}
	}

	/**
	 * Sends an MCP notification
	 */
	notify() {

	}

	/**
	 * Registers or creates a new tool
	 */
	tool(tool) {
		if(!(tool instanceof Tool)) {
			throw new Error('tool must be an instanceof Tool');
		}

		this.tools[tool.constructor.NAME] = tool;
	}

	/**
	 * Registers or creates a new resource
	 */
	resource(resource_info) {

	}
}

module.exports = {
	MCP
};
