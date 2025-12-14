import React from 'react';
import { Source_Code_Pro } from 'next/font/google';
import Styles from './page.module.css';

const source_code_pro = Source_Code_Pro({
	weight: '300'
});

export function Page({ name, description, children }) {
	return (
		<div className={Styles.page}>
			<div className={Styles['page-title']}>
				<h1>{name}</h1>
				<h2 className={source_code_pro.className}>{description}</h2>
			</div>

			<div className={Styles['page-content']}>
				{children}
			</div>
		</div>
	);
}
