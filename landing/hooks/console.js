import React from 'react';

class Jo {
	#open(url) {
		window.open(url, '_blank', 'noopener noreferrer');
	}

	get github() {
		this.#open('https://github.com/jsmrcaga');
		return () => {};
	}

	get linkedin() {
		this.#open('https://linkedin.com/in/jocolina');
		return () => {};
	}

	get website_info() {
		console.log(`
This website was built using Next.js: https://nextjs.org/, and is heavily
inspired by https://ioi.dk 's website.

I wanted to use the new CSS feature @scroll-timeline, but sadly
it is not yet supported in most browsers. That's why the scrolling
animations are triggered using JS. A scroll listener sets the current
x and y values as CSS variables, and the rest is handled using pure CSS.

Safari throttles the scroll event, so the animations are not smooth at all.
Moreover Safari does not fully support the CSS properties used here.
For example the gradient background is using a SVG CSS Filter to add the
grainy effect, and although Safari does end up displaying it correctly,
you can see the noise before the filter is applied for a split second.
I also had to inset a clip of 1px because the background-clip: text property
has an extra pixel that creates a gradient border.

The navigation animations are also handled using CSS, however the timing
is controlled on JavaScript. A custom front-end router handles the url
and triggers the navigation. Once the "page" has floated away, the site
renders the incoming page, teleports the div to the other side of the
page and slides it from the right. I wanted to use Next.js' static pages
to perform the navigation but cold not find a way to perform the animations
if I did that, if you have any idea how please contact me!
		`);
	}

	get websiteInfo() {
		return this.website_info;
		return () => {};
	}

	get tech_skills() {

		const xp_formatter = ({ name, experience, comments }) => {
			const console_formatted = `
%c${name}%c
%c${experience}%c
\n${comments}
			`;

			return [
				console_formatted,
				`
					background: rgba(255, 255, 255, 0.1);
					padding: 12px 20px;
					border-radius: 20px;
					margin-bottom: 10px;
				`,
				``,
				`
					font-style: italic;
				`,
				``,

			];
		};

		const xp = [{
			name: '🧑🏼‍💻 Management / Lead',
			experience: '~3yrs',
			comments: 'I\'ve lead teams @ Weezevent and HireSweet, both on the technical side (SDLC, Testing, CI/CD, deployments, tech vigilance, SOC2...) and on the human side (1 on 1s, carreer steering, tasks & project priorities, inter-team collaboration...)'
		}, {
			name: 'Node.js',
			experience: '~10yrs',
			comments: 'Have been using Node for various backend apps and scripting. Most of my projets are node-based.'
		}, {
			name: '🍃 MongoDB',
			experience: '~5yrs',
			comments: 'Created a small ORM for MongoDB called Executor, you can check it out on my GitHub or Projects page'
		}, {
			name: '🐍 Django',
			experience: '4yrs',
			comments: 'Used Django professionally @ Weezevent, deep delving into the features both of DRF and Django\'s ORM'
		}, {
			name: '⚛ React.js',
			experience: '~5yrs',
			comments: 'Expertise in React, I\'ve used it in professional and personal projects, and love simplicity over "What\'s cool". Don\'t like Redux, rx.js or other overcomplicated state management libraries. Love handling forms using <form> and onSubmit'
		}, {
			name: '⛅️ Cloudflare Workers',
			experience: 'a few projects',
			comments: 'Created a special router for Cloudflare workers, I use them if edge speed is important and the projets are small (for example my url shortener)'
		}, {
			name: 'Terraform',
			experience: 'a few projects + professional experience',
			comments: 'I use Terraform for all my personal projects, and used it professionally in the past. I was sad when the optional experiment completely changed in the actual release'
		},{
			name: 'AWS',
			experience: 'usual services',
			comments: 'I deploy many projects to Lambda, or ECS + Fargate. I use some other services like S3, Cloudfront, Cloudwatch... and have professionally set up S2S VPNs + DNS resolutions.'
		}];

		const formatted_console = xp.map(x => xp_formatter(x));
		console.log('Here\'s a small recap of what I consider the most impactful tech skills I have');
		for(const x of formatted_console) {
			console.log(...x);
		}

		return () => {};
	}

	get techSkills() {
		return this.tech_skills;
		return () => {};
	}

	get contact() {
		this.#open(`mailto:jo@jocolina.com?subject=${encodeURIComponent('I saw your personal website')}`);
		return () => {};
	}
}

export function useConsoleMessage() {
	React.useEffect(() => {
		console.log(
			`
%c👋🏼 Welcome traveler!%c
If you're reading this, you probably wanted to see if there were
any errors or specific messages in the console. Congratulations 🎉!
You found this one.

To know more about my %ctechnical skills%c I encourage you to visit
my GitHub profile here: https://github.com/jsmrcaga

If you're looking for my %cexperiences%c, the Experience tab should
give you an overview, otherwise you can visit my 
LinkedIn here: https://linkedin.com/in/jocolina

There is also a special API in this website called %cjo%c.
You can use it as follows:
%c jo.github %c and %c jo.linkedin %c should open the corresponding
tabs on your browser

%c jo.website_info %c or %c jo.websiteInfo %c will log some interesting
information about this website

%c jo.tech_skills %c or %c jo.techSkills %c will log some interesting
information about this website

%c jo.contact %c will open your e-mail software so you can contact me.

%c 🤫 there might be easter eggs littered around!

			`,
			`
				background: rgba(255, 255, 255, 0.1);
				padding: 12px 20px;
				border-radius: 20px;
				margin: 5px;
				margin-bottom: 10px;
			`,
			``,
			`
				background: rgba(255, 255, 255, 0.1);
				padding: 5px 10px;
				border-radius: 20px;
			`,
			``,
			`
				background: rgba(255, 255, 255, 0.1);
				padding: 5px 10px;
				border-radius: 20px;
			`,
			``,
			`
				background: rgba(255, 255, 255, 0.1);
				padding: 5px 10px;
				border-radius: 20px;
			`,
			``,
			`
				background: rgba(255, 255, 255, 0.1);
				padding: 5px 10px;
				border-radius: 20px;
			`,
			``,
			`
				background: rgba(255, 255, 255, 0.1);
				padding: 5px 10px;
				border-radius: 20px;
			`,
			``,
			`
				background: rgba(255, 255, 255, 0.1);
				padding: 5px 10px;
				border-radius: 20px;
			`,
			``,
			`
				background: rgba(255, 255, 255, 0.1);
				padding: 5px 10px;
				border-radius: 20px;
			`,
			``,
			`
				background: rgba(255, 255, 255, 0.1);
				padding: 5px 10px;
				border-radius: 20px;
			`,
			``,
			`
				background: rgba(255, 255, 255, 0.1);
				padding: 5px 10px;
				border-radius: 20px;
			`,
			``,
			`
				background: rgba(255, 255, 255, 0.1);
				padding: 5px 10px;
				border-radius: 20px;
			`,
			``,
			`
				font-size: 0.5rem;
			`
		);

		const jo = new Jo();
		window.jo = jo;
	}, []);
}
