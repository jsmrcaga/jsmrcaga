import React from 'react';

import { GradientText } from '../text/text';

import Style from './overlay.module.css';

import { classnames } from '../../utils/classnames';

import Scroll from '../../public/icons/scroll.svg';

export function Overlay() {
	return (
		<>
			<div className={Style.links}>
			</div>

			<div className={Style['scroll-me']}>
				<Scroll/>
			</div>
		</>
	);
}

export function WorksBestInChrome() {
	const isSafari = React.useMemo(() => {
		if(!globalThis.window) {
			return false;
		}

		const ua = globalThis.navigator.userAgent;
		return /safari/i.test(ua) && !/chrome/i.test(ua);
	}, []);

	return (
		<div className={classnames(Style.chrome, {
			[Style['is-safari']]: isSafari
		})}>
			<GradientText
				to="#3d3def"
				from="#ff4646"
			>
				<a href="https://www.google.com/chrome/">Works better in Chrome</a>
			</GradientText>
		</div>
	);
}
