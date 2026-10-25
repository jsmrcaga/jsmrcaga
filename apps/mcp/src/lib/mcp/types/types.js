/**
 * @category MCP/Types
 * @typedef {Object} MCPMessageParamsMeta
 * @property {string} "io.modelcontextprotocol/protocolVersion" - The client's protocol version
 * @property {Object} "io.modelcontextprotocol/clientInfo" - The client's info
 * @property {string} "io.modelcontextprotocol/clientInfo".name - The client's name
 * @property {string} "io.modelcontextprotocol/clientInfo".version - The client's version
 * @property {Object} "io.modelcontextprotocol/clientCapabilities" - The client's capabilities
 */

/**
 * @category MCP/Types
 * @typedef {Object} MCPResponseParamsMeta
 * @property {Object} "io.modelcontextprotocol/serverInfo" - The client's info
 * @property {string} "io.modelcontextprotocol/serverInfo".name - The client's name
 * @property {string} "io.modelcontextprotocol/serverInfo".version - The client's version
 */


/**
 * @category MCP/Types
 * @typedef {Object} MCPMessageBase
 * @property {string} jsonrpc - The jsonrpc version
 * @property {string|number} id - The message id
 */

/**
 * @category MCP/Types
 * @typedef {Object} MCPClientPayload
 * @property {string} method - The message method
 * @property {Object} params - The message params
 * @property {MCPMessageParamsMeta} params._meta
 */

/**
 * @category MCP/Types
 * @typedef {MCPMessageBase & MCPClientPayload} MCPMessage
 */

/**
 * @category MCP/Types
 * @typedef {'complete'|'input_required'|string} MCPResultType
 */

/**
 * @category MCP/Types
 * @typedef {Object} MCPResponsePayload
 * @property {Object} result
 * @property {MCPResultType} result.resultType
 * @property {MCPResponseParamsMeta} result._meta
 */

/**
 * @category MCP/Types
 * @typedef {Object} MCPErrorResponsePayload
 * @property {Object} error
 * @property {string} error.code
 * @property {string} error.message
 * @property {unknown} [error.data]
 */

/**
 * @category MCP/Types
 * @typedef {MCPMessageBase & MCPResponsePayload} MCPResponse
 */

/**
 * @category MCP/Types
 * @typedef {MCPMessageBase & MCPErrorResponsePayload} MCPError
 */
module.exports = {};
