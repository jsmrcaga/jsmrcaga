export class RequestError extends Error {
	constructor(message, { url, response, headers, ...options }) {
		super(message, options);
		this.url = url;
		this.response = response;
		this.headers = headers;
	}

	static from_response(message, { url, response }) {
		const headers = new Headers(res.headers);
		let response_promise = null;
		if(/application\/json/.test(res.headers.get('content-type'))) {
			response_promise = res.json();
		} else {
			response_promise = res.text();
		}

		return response_promise.then(json => {
			return new RequestError(message, {
				url,
				response: json,
				headers: res.headers
			});
		});
	}
}
