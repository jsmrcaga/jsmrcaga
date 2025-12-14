import { RequestError } from '../errors';

/**
 * @typedef {Object} UnifiWanConfigInterfaceResponse
 * @property {('FAILOVER_ONLY' | 'DISTRIBUTED')} UnifiWanConfigInterfaceResponse.mode
 * @property {String} UnifiWanConfigInterfaceResponse.name
 * @property {Number} UnifiWanConfigInterfaceResponse.priority
 * @property {String} UnifiWanConfigInterfaceResponse.wan_networkgroup
 * @property {String} UnifiWanConfigInterfaceResponse.wan_sla
 * @property {Number} UnifiWanConfigInterfaceResponse.weight
 */

/**
 * @typedef {Object} UnifiWanConfigResponse
 * @property {('FAILOVER_ONLY' | 'LOAD_BALANCER')} UnifiWanConfigResponse.mode
 * @property {UnifiWanConfigInterfaceResponse[]} UnifiWanConfigResponse.wan_interfaces
 */

// There's more but we don't use it yet
// You can check in the local dashboard
/**
 * @typedef {Object} UnifiWanISPStatsResponse
 * @property {Object[]} UnifiWanISPStatsResponse.speedtest_historical
 * @property {number} UnifiWanISPStatsResponse.speedtest_historical.download_mbps
 * @property {string} UnifiWanISPStatsResponse.speedtest_historical.id
 * @property {string} UnifiWanISPStatsResponse.speedtest_historical.interface_name
 * @property {number} UnifiWanISPStatsResponse.speedtest_historical.latency_ms
 * @property {number} UnifiWanISPStatsResponse.speedtest_historical.time
 * @property {number} UnifiWanISPStatsResponse.speedtest_historical.upload_mbps
 * @property {string} UnifiWanISPStatsResponse.speedtest_historical.wan_networkgroup
 */

export class Unifi {
	constructor({
		local_endpoint,
		local_api_key
	}) {
		this.local_endpoint = local_endpoint;
		this.local_api_key = local_api_key;
	}

	local_request(path, {
		query = null,
		body,
		headers = {},
		...options
	} = {}) {
		if(!this.local_endpoint) {
			const error = new Error('No Unifi endpoint');
			error.code = 'NO_UNIFI_ENDPOINT';
			throw error;
		}

		const url = new URL(`${this.local_endpoint}/${path}`);
		if(query && Object.keys(query).length) {
			for(const [k, v] of Object.entries(query)) {
				url.searchParams.set(k, v);
			}
		}

		headers['X-API-KEY'] = this.local_api_key;
		// @todo: check if this is necessary for _all_ requests
		headers['Accept'] = 'application/json';

		return fetch(url, { body, headers, ...options }).then(res => {
			if(!res.ok) {
				return RequestError.from_response('Bad Unifi Request', { response: res, url: url.toString() }).then(error => {
					throw error;
				});
			}

			const headers = new Headers(res.headers)
			let response_promise = null;
			if(/application\/json/.test(headers.get('content-type'))) {
				response_promise = res.json();
			} else {
				response_promise = res.text();
			}

			return response_promise.then(data => {
				return {
					headers,
					data,
					response: res
				};
			});
		});
	}

	/**
	 * Gets ISP stats and WAN configuration from the local UnifiOS instance
	 * @returns {Object} result
	 * @property {string} result.name
	 * @property {string} result.wan_networkgroup
	 * @property {UnifiWanISPStatsResponse} result.stats
	 */
	isp_stats() {
		/** @var {UnifiWanConfigResponse} data */
		return this.local_request('/proxy/network/v2/api/site/default/wan/load-balancing/configuration').then(({ data }) => {
			const wan_promises = data.wan_interfaces.map(({ name, wan_networkgroup }) => {
				return this.local_request(`/proxy/network/v2/api/site/default/wan/${wan_networkgroup}/isp-status`, {
					query: {
						include_isp_alerts: false
					}
				/** @var {UnifiWanISPStatsResponse} data */
				}).then(({ data }) => {
					return {
						name,
						wan_networkgroup,
						stats: {
							...data,
							speedtest_historical: data.speedtest_historical.filter(({ wan_networkgroup: stat_wan }) => wan_networkgroup === stat_wan)
						}
					};
				});
			});

			return Promise.all(wan_promises);
		});
	}
}


export const unifi = new Unifi({
	local_endpoint: process.env.UNIFI_LOCAL_ENDPOINT,
	local_api_key: process.env.UNIFI_LOCAL_API_KEY
});
