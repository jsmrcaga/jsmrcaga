import React from 'react';

import { classnames } from '../../utils';

import Style from './scroll.module.css';

export function CSSScrollable({ horizontal=false, className, scrollStart=0, scrollEnd=0, children, ...rest }) {
	const scroll_x_y_cls = horizontal ? Style['animation-scroll-x'] : Style['animation-scroll-y'];
	return (
		<div
			className={classnames(scroll_x_y_cls, Style['animation-scroll'], className)}
			style={{
				'--scroll-start': scrollStart,
				'--scroll-end': scrollEnd
			}}
			{...rest}
		>
			{children}
		</div>
	);
}

export function ScrollAnimate({ children, className, scrollStart, scrollEnd, animations=[] }) {
	const classes = animations.map(name => Style[name]);

	return (
		<CSSScrollable
			className={classnames(className, Style.transformable, ...classes)}
			scrollStart={scrollStart}
			scrollEnd={scrollEnd}
		>
			{children}
		</CSSScrollable>
	);
}
