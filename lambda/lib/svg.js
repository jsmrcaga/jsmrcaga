const fs = require('node:fs/promises');
const path = require('node:path');

// Allows us to read these files once for every lambda execution
const templateFile = fs.readFile(path.join(__dirname, './template/template.svg'));
const nothingPlayingFile = fs.readFile(path.join(__dirname, './template/nothinplaying.png'));

function render_svg({ image, artist, name, url }) {
	return templateFile.then(svg => {
		let templated = svg.toString('utf8').trim();
	  for(const [k, v] of Object.entries({ image, artist, name, url })) {
	    templated = templated.replace(new RegExp(`\{${k}\}`, 'i'), v);
	  }
	  return templated;
	});
}

function get_image(image) {
	if(!image) {
		return nothingPlayingFile;
	}

	return fetch(image).then(response => response.arrayBuffer());
}

function create_svg({ image, artist, name, url }) {
	return get_image(image).then((raw) => {
		let buff = Buffer.from(raw).toString('base64');
		return render_svg({ image: buff, artist, name, url });
	});
}

module.exports = {
	create: create_svg
};
