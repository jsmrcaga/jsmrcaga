export function classnames(...params) {
	return params.reduce((classes, obj) => {
		if(typeof obj === 'string') {
			classes.push(obj);
			return classes;
		}

		if(Array.isArray(obj)) {
			classes.push(...obj);
			return classes;
		}

		if(typeof obj === 'object') {
			for(const [key, value] of Object.entries(obj)) {
				if(value) {
					classes.push(key)
				}
			}

			return classes;
		}

		return classes;
	}, []).join(' ');
}
