import Styles from './svg-filters.module.css';

export function SVGTurbulence() {
	return (
		<svg id="svg-turbulence" viewBox='0 0 250 250' xmlns="http://www.w3.org/2000/svg" className={Styles.hidden}>
			<filter id="noise-filter" x="0" y="0" width="100%" height="100%">
				<feTurbulence
					type="turbulence"
					baseFrequency="0.7"
					numOctaves="1"
				/>
			</filter>
			<rect width="100%" height="100%" filter="url(#svg-turbulence-filter)"/>
		</svg>
	);
}
