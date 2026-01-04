'use client';

import React from 'react';

import Styles from './overlay.module.css';
import { Canvas, Background, Bubbles } from './components/bubbles';

// 2min
// const MAX_IDLE_TIME = 2 * 60 * 1000;
const MAX_IDLE_TIME = 15 * 1000;

export const Overlay = () => {
	const [rendered, setRendered] = React.useState(false);

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			setRendered(true);
		}, MAX_IDLE_TIME);

		return () => {
			clearTimeout(timeout);
		};
	}, []);

	if(!rendered) {
		return null;
	}

	return (
		<div className={Styles.overlay} onClick={() => setRendered(false)}>
			<Canvas/>
		</div>
	);
};
