const fs = require('fs');
const path = require('path');
const fishingrod = require('fishingrod');

function render_svg({ image, artist, name, url }) {
	const svg = fs.readFileSync(path.join(__dirname, './template/template.svg'));
	let templated = svg.toString('utf8').trim();
  for(const [k, v] of Object.entries({ image, artist, name, url })) {
    templated = templated.replace(new RegExp(`\{${k}\}`, 'i'), v);
  }
  return templated;
}

function create_svg({ image, artist, name, url }) {
	return fishingrod.fish(image).then(({ status, raw }) => {
		if(status !== 200) {
			throw new Error(`Bad status ${status}`);
		}

		let buff = Buffer.from(raw).toString('base64');
		return render_svg({ image: buff, artist, name, url });
	});
}

module.exports = {
	create: create_svg
};
