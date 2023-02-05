const highlighter = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = (config) => {
	config.addPassthroughCopy('public');

	config.addPlugin(highlighter);

	config.addLayoutAlias('main', 'layout/main.html');

	return {
		dir: {
			includes: 'src'
		}
	};
};
