import React from 'react';

import Style from './icon.module.css';

export function Icon({ icon }) {
	return (
		<i className={Style.icon}>
			{icon}
		</i>
	);
}
