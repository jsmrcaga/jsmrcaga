'use client';
import React from 'react';
import Styles from './swiper.module.css';

const MAX_EXTRA_PAGER_WIDTH = 50;
const MAX_EXTRA_PAGER_OPACITY = 60;

function Pager({ scroller, count }) {
	const items = [];
	const pager_ref = React.useRef(null);

	React.useEffect(() => {
		if(!pager_ref.current) {
			return;
		}

		const scroller = pager_ref.current.parentElement;

		const { width } = scroller.getBoundingClientRect();

		function on_scroll(event) {
			window.requestAnimationFrame(() => {
				const { scrollLeft: window_start } = scroller;
				const window_end = window_start + width;
				// Compute % of each "window" displayed
				// only 2 windows can be displayed simultaneously while scrolling
				for(let i = 0; i < count; i++) {
					const section_start = width * i;
					// width = window_width because it's 100% of the screen
					// we _could_ make this mega generic by passing refs of each children
					// react-router Swtich/Route style
					const section_end = section_start + width;
					const section_width = section_end - section_start;

					const visible_part_start = Math.max(section_start, window_start);
					const visible_part_end = Math.min(section_end, window_end);

					const visible_length = Math.max(visible_part_end - visible_part_start, 0);
					const visible_percent = visible_length / section_width;

					scroller.style.setProperty(`--child-${i}-width`, `${visible_percent * MAX_EXTRA_PAGER_WIDTH}px`);
					scroller.style.setProperty(`--child-${i}-opacity`, `${visible_percent * MAX_EXTRA_PAGER_OPACITY}%`);
				}
			});
		}

		// Call on_scroll once to "init"
		// the items
		on_scroll();

		scroller.addEventListener('scroll', on_scroll);

		return () => {
			scroller.removeEventListener('scroll', on_scroll);
		};
	}, [pager_ref, count]);

	const go_to_page = (page_nb) => {
		const scroller = pager_ref.current.parentElement;
		const { width } = scroller.getBoundingClientRect();
		scroller.scrollTo(width * page_nb, 0);
	};

	for(let i = 0; i < count; i++) {
		items.push(
			<div
				key={i}
				style={{
					'opacity': `calc(20% + var(--child-${i}-opacity))`,
					'width': `calc(50px + var(--child-${i}-width))`
				}}
				onClick={() => go_to_page(i)}
			>
				{i+1}
			</div>
		);
	}

	return (
		<div ref={pager_ref} className={Styles.pager}>
			{items}
		</div>
	);
}

export function Swiper({ children }) {
	const children_count = React.Children.count(children);

	return (
		<div className={Styles.swiper}>
			{
				React.Children.map(children, child => {
					return (
						<div className={Styles.child}>
							{child}
						</div>
					);
				})
			}

			<Pager count={children_count}/>
		</div>
	);
}
