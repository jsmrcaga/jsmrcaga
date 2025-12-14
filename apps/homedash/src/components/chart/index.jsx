'use client';

import React from 'react';

import {
	AreaChart as RechartsAreaChart,
	Area,
	Tooltip,
	ResponsiveContainer
} from 'recharts';

import Styles from './chart.module.css';

function ChartTooltip({ payload, unit }) {
	if(!payload?.length) {
		return null;
	}

	const { payload: { value, name }} = payload[0];
	return (
		<div className={Styles['chart-tooltip']}>
			<div className={Styles['value']}>
				{value}
				{unit && <span>{unit}</span>}
			</div>
			<div>{name}</div>
		</div>
	);
}

export const COLORS = {
	blue: '#1368ed',
	cyan: '#13dbed',
	green: '#13ed37',
	orange: '#ed6713',
	purple: '#8b13ed',
	red: '#ed1330',
	yellow: '#ede613',
};

export function AreaChart({ id, data, color, datakey }) {
	/*<Tooltip content={<ChartTooltip unit={unit}/>}/>*/

	/*
		For some reason declaring the defs outside does not work 
		I'm guessing they filter every component
	*/
	return [
		<defs key={`defs-${id}`}>
			<linearGradient id={`chartGradient-${id}`} x1="0" y1="0" x2="0" y2="1">
				<stop offset="5%" stopColor={color} stopOpacity={0.2}/>
				<stop offset="100%" stopColor={color} stopOpacity={0}/>
			</linearGradient>
		</defs>,
		<Area
			key={`area-${id}`}
			type="monotone"
			dataKey={datakey}
			stroke={color}
			fill={`url(#chartGradient-${id})`}
			fillOpacity={0.8}
		/>
	];
}

export function Chart({ data, children }) {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<RechartsAreaChart data={data} margin={{ top: 10, left: 0, right: 0, bottom: 0 }}>
				{children}
			</RechartsAreaChart>
		</ResponsiveContainer>
	);
}
