import React from 'react';
import { classnames } from '../../utils';

import { useRouter } from '../';

import Style from './ioi-card.module.css';

export function IOICardGroup({ children, className }) {
	// display grid
	return (
		<div className={classnames(className, Style['card-group'])}>
			{children}
		</div>
	);
}

function CardLink({ children, href }) {
	const { push } = useRouter();
	if(!href) {
		return children;
	}

	if(/^http/.test(href)) {
		return (
			<a href={href} className={Style.a} target="_blank">
				{children}
			</a>
		);
	}

	const handle_internal_url = (e) => {
		e.preventDefault();
		push(href);
	}

	return (
		<a onClick={handle_internal_url} className={Style.a}>
			{children}
		</a>
	);

}

export function IOICard({ image, tags, title, description, size=1, brightness=1, blur=false, href=null, transparent=false }) {
	const containerRef = React.useRef(null);

	React.useEffect(() => {
		if(!containerRef.current) {
			return;
		}

		const listener = (e) => {
			const rect = e.currentTarget.getBoundingClientRect();
			const x = Math.round(e.pageX - rect.x);
			const y = Math.round(e.pageY - rect.y);
			const normalizedX = x / rect.width;
			const normalizedY = y / rect.height;

			containerRef.current.style.setProperty('--mouse-x', normalizedX - 0.5);
			containerRef.current.style.setProperty('--mouse-y', normalizedY - 0.5);
		};

		containerRef.current?.addEventListener('mousemove', listener);
		return () => containerRef.current?.removeEventListener('mousemove', listener);
	}, [containerRef]);

	return (
		<CardLink href={href}>
			<div
				ref={containerRef}
				className={classnames(Style.card, {
					[Style.transparent]: transparent
				})}
				style={{
					'--colspan': size,
					'--brightness': brightness,
					'--blur': blur ? '2px' : '0'
				}}
			>
				<div className={Style.background} style={{
					backgroundImage: `url(${image})`
				}}/>

				<div className={Style.content}>
					{
						tags.length &&
						<div className={Style.tags}>
							<ul>
							{
								tags.map(t => <li key={t}>{t}</li>)
							}
							</ul>
						</div>
					}
					
					<div className={Style.text}>
						<div className={Style.title}>
							{title}
						</div>

						<div className={Style.description}>
							{description}
						</div>
					</div>
				</div>
			</div>
		</CardLink>
	);
}
