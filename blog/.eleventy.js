const highlighter = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = (config) => {
	config.addPassthroughCopy('public');
	config.addPassthroughCopy({
		'src/**/*.css': 'public/css'
	});

	config.addPlugin(highlighter);

	// Layouts
	config.addLayoutAlias('main', 'layout/main.html');
	config.addLayoutAlias('article', 'layout/article/article.html');

	return {
		dir: {
			includes: 'src'
		}
	};
};
