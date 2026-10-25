const { MCPToolNotExistsError } = require('./errors');

/**
 * @category MCP/Application/Types/Messages
 * @typedef {Object} ServerDiscoverResponse
 * @property {MCPResultType} resultType
 * @property {string[]} supportedVersions - List of supported versions
 * @property {Object} capabilities - List of tools and resources
 * @property {string} instructions - Text-based on what this server allows
 * @property {number} ttlMs - Time-to-live before cache-refresh, in millis
 * @property {string} cacheScope - "public"
 */

/**
 * @category MCP/Application/Types/Messages
 * @typedef {Object} ToolListResponse
 * @property {MCPResultType} resultType
 * @property {string[]} supportedVersions - List of supported versions
 * @property {Object} capabilities - List of tools and resources
 * @property {string} instructions - Text-based on what this server allows
 * @property {number} ttlMs - Time-to-live before cache-refresh, in millis
 * @property {string} cacheScope - "public"
 */

/**
 * @category MCP/Application
 * @class Server - Represents the MCP server capabilities
 */
class Server {
	/**
	 * Responds to "server/discover"
	 * @param {{ tools: Tool[], resources: Resource[] }} entities - MCP entities
	 * @return {ServerDiscoverResponse}
	 */
	discover({ supported_versions=[], tools={}, resources={}, prompts={}, extensions={} }) {
		const capabilities = {};
		const has_tools = Object.keys(tools).length;
		const has_resources = Object.keys(resources).length;
		const has_prompts = Object.keys(prompts).length;
		const has_extensions = Object.keys(extensions).length;

		if(has_tools) {
			capabilities.tools = {};
		}

		if(has_resources) {
			capabilities.resources = {};
		}

		if(has_prompts) {
			capabilities.prompts = {};
		}

		if(has_extensions) {
			capabilities.extensions = {};
		}

		return {
			resultType: 'complete',
			supportedVersions: supported_versions,
			capabilities,
			instructions: '',
			ttlMs: 3_600_000,
			cacheScope: 'public'
		};
	}

	/**
	 * Returns the server info for the _meta tag
	 */
	server_info({ name, version }) {
		return {
			"io.modelcontextprotocol/serverInfo": {
				name,
				version
			}
		};
	}

	/**
	 * Returns the list of tools and corresponding schemas
	 */
	tool_list(tools) {
		return {
			resultType: 'complete',
			tools: Object.values(tools).map(tool => {
				return tool.constructor.mcp_format()
			})
		}
	}

	/**
	 * Performs the tool execution
	 * @param {Record<string, Tool>} tools - tool map
	 * @param {Object} params - The arguments of the tool call
	 */
	tool_call(tools, params) {
		const { name, arguments: args } = params;
		const tool = tools[name];

		if(!tool) {
			throw new MCPToolNotExistsError(name);
		}

		// Tool call will validate the params
		return tool.call(args);
	}

	/**
	 * Lists the resources of this MCP server
	 */
	resource_list(resources) {

	}

	/**
	 * Reads a resource (executes the read action)
	 */
	resource_read(resources, request) {

	}

	/**
	 * Returns the list of resource templates
	 */
	resource_template_list(resources) {

	}
}

module.exports = {
	Server
};
