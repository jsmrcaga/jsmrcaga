import React from 'react';

import { classnames } from '../../utils';

import Style from './text.module.css';

export function GradientText({ children, className, as='span', from, to }) {
	const Component = as;
	let style = null;
	if(from && to) {
		style = {
			style: {
				'--from': from,
				'--to': to
			}
		};
	}

	return (
		<Component
			className={classnames(className, Style.gradient)}
			{...style}
		>
			{children}
		</Component>
	);
}
