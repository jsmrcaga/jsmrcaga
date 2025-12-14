'use client';
import React from 'react';
import Styles from './reloader.module.css';

import { Source_Code_Pro } from 'next/font/google';
const source_code_pro = Source_Code_Pro({
	weight: '300'
});

// 60 min
const RELOAD_PERIOD_MS = (1000 * 60) * 60;
const COUNTER_STEP = 50;

const SECOND_MILLIS = 1000;
const MINUTE_MILLIS = (60 * SECOND_MILLIS);
const HOUR_MILLIS = 60 * MINUTE_MILLIS;
const DAY_MILLIS = 24 * HOUR_MILLIS;

function pad(nb, qtty=2) {
	return `00${nb}`.slice(qtty * -1);
}

function time_value_str(value, unit, fixed=false) {
	if(fixed) {
		// 5 because we're playing with strings and we have the `.``
		return `${pad(value.toFixed(2), 5)}${unit}`;
	}

	if(value <= 0) {
		return '';
	}

	return `${pad(value)}${unit}`;
}

function TimeDisplay({ millis }) {
	let remaining = millis;
	const days = Number.parseInt(millis / DAY_MILLIS)
	remaining = millis - (days * DAY_MILLIS);

	const hours = Number.parseInt(remaining / HOUR_MILLIS);
	remaining = remaining - (hours * HOUR_MILLIS);

	const minutes = Number.parseInt(remaining / MINUTE_MILLIS);
	remaining = remaining - (minutes * MINUTE_MILLIS);

	const seconds = (remaining / SECOND_MILLIS);
	
	return [
		time_value_str(days, 'd'),
		time_value_str(hours, 'h'),
		time_value_str(minutes, 'm'),
		time_value_str(seconds, 's', true),
	].join(' ');
}

export function Reloader() {
	const [remaining, setRemaining] = React.useState(RELOAD_PERIOD_MS);

	React.useEffect(() => {
		setInterval(() => {
			setRemaining(remaining => {
				if(remaining - COUNTER_STEP <= 0) {
					window.location.reload();
					setRemaining(0);
					return;
				}

				return remaining - COUNTER_STEP;
			});
		}, COUNTER_STEP);
	}, [setRemaining]);

	return (
		<div className={`${Styles.counter} ${source_code_pro.className}`}>
			<TimeDisplay millis={remaining} />
		</div>
	);
}
