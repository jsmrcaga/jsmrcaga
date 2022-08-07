import React from 'react';

export function useCSSScrolling(target, { throttle=50, onScrollEnd } = {} ) {
	const [ scrollEnded, setScrollEnded ] = React.useState(false);

	const set_css_variables = React.useCallback(() => {
		if(!target.current) {
			return;
		}

		const scrollEnded = Math.ceil(target.current.offsetHeight + target.current.scrollTop) === target.current?.scrollHeight;
		setScrollEnded(scrollEnded);
		if(scrollEnded) {
			onScrollEnd?.();
		}

		const style_target = target === globalThis.window ? window.document.documentElement : target.current;
		style_target.style.setProperty('--scroll-x', target.current.scrollX || target.current.scrollLeft);
		style_target.style.setProperty('--scroll-y', target.current.scrollY || target.current.scrollTop);
	}, [target, onScrollEnd]);

	React.useEffect(() => {
		if(!target.current) {
			return;
		}

		let throttled = false;
		const listener = (event) => {
			if(throttle === false) {
				return set_css_variables();
			}

			if(throttled) {
				return;
			}

			throttled = true;
			setTimeout(() => {
				// Update scroll values
				set_css_variables();
				throttled = false;
			}, throttle);
		};

		target.current?.addEventListener('scroll', listener);
		return () => target.current?.removeEventListener('scroll', listener);
	}, [target, throttle, set_css_variables]);

	// initial data
	React.useEffect(() => {
		set_css_variables();
	}, [set_css_variables]);

	return {
		scrollEnded
	};
};
