import React from 'react';

import Style from './card.module.css';

import { classnames } from '../../utils';

export function CardGroup({ children, className, ...rest }) {
	return (
		<div className={classnames(className, Style['card-group'])} {...rest}>
			{children}
		</div>
	);
}

export function Card({ children, className, centered=true, ...rest }) {
	const cls = classnames(Style.card, className, {
		[Style.centered]: centered
	});

	return (
		<div className={cls}>
			{children}
		</div>
	);
}
