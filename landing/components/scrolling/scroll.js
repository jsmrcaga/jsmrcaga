import React from 'react';

import { classnames } from '../../utils';

import Style from './scroll.module.css';

const useWhyEffect = (deps=[]) => {
	const lastDeps = React.useRef(deps);

	React.useEffect(() => {
		const diff = lastDeps.current.map((dep, i) => {
			if(dep !== deps[i]) {
				return true;
			}

			return false;
		});

		lastDeps.current = deps;
		console.log('WHY?', diff);
	}, deps);
};

export const CSSScrollable = React.forwardRef(({ horizontal=false, className, scrollStart=0, scrollEnd=0, children, ...rest }, ref) => {
	const scroll_x_y_cls = horizontal ? Style['animation-scroll-x'] : Style['animation-scroll-y'];

	return (
		<div
			ref={ref}
			className={classnames(scroll_x_y_cls, Style['animation-scroll'], Style['mobile-ready'], className)}
			style={{
				'--scroll-start': scrollStart,
				'--scroll-end': scrollEnd
			}}
			{...rest}
		>
			{children}
		</div>
	);
});

export function ScrollAnimate({ children, className, scrollStart=0, scrollEnd=0, animations=[], magic=false }) {
	const classes = animations.map(name => Style[name]);

	const cssRef = React.useRef(null);

	const [{ scrollStart: magicStart, scrollEnd: magicEnd }, setMagic] = React.useState({
		scrollStart,
		scrollEnd
	});

	const computeMagic = React.useCallback(() => {
		if(!magic || !cssRef.current) {
			return;
		}

		// weird that we have to do this, but it works because
		// 1. the parent is the scrollable element
		// 2. scrollTop is how many pixels _have been_ scrolled
		// 3/ top is how many pixels from the top of the page our element is

		const scrolledElement = cssRef.current.parentElement.parentElement;
		const rect = scrolledElement.getBoundingClientRect();

		const scrollableParent = scrolledElement.parentElement;
		const scrollableParentRect = scrollableParent.getBoundingClientRect();

		const top = (rect.top + scrollableParent.scrollTop);

		setMagic({
			scrollStart: Math.max(top - rect.height, 0),
			scrollEnd: top
		});
	}, [cssRef, magic]);

	React.useEffect(() => {
		computeMagic();

		// Every second should be allright
		const interval = setInterval(() => computeMagic(), 1_000);
		return () => clearInterval(interval);
	}, [computeMagic]);

	return (
		<CSSScrollable
			ref={cssRef}
			className={classnames(className, Style.transformable, ...classes)}
			scrollStart={magicStart}
			scrollEnd={magicEnd}
		>
			{children}
		</CSSScrollable>
	);
}
