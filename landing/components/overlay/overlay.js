import React from 'react';

import Style from './overlay.module.css';

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
