'use client';
import React from 'react';
import Styles from './unifi.module.css';

import { classnames } from '../../../../components/utils/classnames';
import { Chart, AreaChart, COLORS } from '../../../../components/chart/';

// xxx: hardcoded
const COLOR_PAIRS = {
	'WAN2': {
		up: COLORS.blue,
		down: COLORS.purple
	},
	'WAN': {
		up: COLORS.red,
		down: COLORS.orange
	}
};

function MbpsFormatter({ number }) {
	if(number < 1) {
		return `${number * 1000} Kbps`;
	}

	if(number > 1000) {
		return `${(number / 1000).toFixed(2)} Gbps`;
	}

	return `${number} Mbps`;
}

function TextStats({ data, combined_series }) {
	const last_values = combined_series[combined_series.length - 1];
	return (
		<div className={classnames(Styles['full-size'], Styles.overlay)}>
			<div>
				<h1 style={{ color: COLOR_PAIRS['WAN2'].down }}>⬇︎ <MbpsFormatter number={last_values['WAN2_download']}/></h1>
				<h2 style={{ color: COLOR_PAIRS['WAN'].down }}>⬇︎ <MbpsFormatter number={last_values['WAN_download']}/></h2>
			</div>
			<div>
				<h1 style={{ color: COLOR_PAIRS['WAN2'].up }}>⬆︎ <MbpsFormatter number={last_values['WAN2_upload']}/></h1>
				<h2 style={{ color: COLOR_PAIRS['WAN'].up }}>⬆︎ <MbpsFormatter number={last_values['WAN_upload']}/></h2>
			</div>
		</div>
	);
}

export function ISPChart({ data }) {
	const { combined_series, series, last_values } = React.useMemo(() => {
		const date_formatter = new Intl.DateTimeFormat(globalThis.navigator?.language, {
			dateStyle: 'short',
		});

		const combined_series = {};

		const series = [];

		data.forEach(({ name, wan_networkgroup, stats }) => {
			series.push({
				id: `${wan_networkgroup}_upload`,
				color: COLOR_PAIRS[wan_networkgroup].up
			});

			series.push({
				id: `${wan_networkgroup}_download`,
				color: COLOR_PAIRS[wan_networkgroup].down
			});

			// Unifi returns the speedtests 
			stats.speedtest_historical.toSorted((a, b) => {
				return new Date(a.time) - new Date(b.time)
			}).map(({ download_mbps, upload_mbps, time }) => {
				const formatted_time = date_formatter.format(new Date(time));

				combined_series[formatted_time] = {
					...combined_series[formatted_time],
					[`${wan_networkgroup}_download`]: download_mbps,
					[`${wan_networkgroup}_upload`]: upload_mbps
				};
			});
		});

		const consolidated_series = Object.entries(combined_series).map(([name, values]) => {
			return {
				name,
				...values
			};
		});

		return {
			combined_series: consolidated_series,
			series,
		};
	}, [data]);

	return (
		<div className={classnames(Styles['chart-overlay'], Styles['full-size'])}>
			<div className={Styles['full-size']}>
				<Chart data={combined_series}>
					{
						series.map(({ id, color }) => {
							return <AreaChart key={id} id={id} datakey={id} color={color}/>
						})
					}
				</Chart>
			</div>

			<TextStats data={data} combined_series={combined_series}/>
		</div>
	);
}
