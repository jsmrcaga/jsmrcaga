import React from 'react';
import {
	StickySection,
	Title,
	ScrollAnimate,
	Overlay,
	GradientText,
	Header,
	Splash,
	useNavigator
} from '../../';

import Style from './home.module.css';


export function Home() {
	const { scrollerRef } = useNavigator();
	React.useEffect(() => {
		if(globalThis.window.innerWidth > 550) {
			scrollerRef?.current?.scrollTo({
				left: 0,
				top: 1200,
				behavior: 'smooth'
			});
			return;
		}

		// For some reason scrolling on mobile breaks the viewport
		scrollerRef?.current?.scrollTo(0, 1200);
	}, [scrollerRef]);

	const isMobile = globalThis.window ? globalThis.window.innerWidth <= 550 : true;

	return (
		<>
			<Overlay/>
			<StickySection centered>
				<Header/>
				<ScrollAnimate
					animations={['appear']}
					scrollStart={0}
					scrollEnd={1200}
				>
					<Splash/>
				</ScrollAnimate>

				<ScrollAnimate
					animations={['scale-down', 'slide-up', 'appear']}
					scrollStart={0}
					scrollEnd={1200}
				>
					<ScrollAnimate
						animations={['fade-out']}
						scrollStart={1600}
						scrollEnd={2500}
					>
						<Title as='h1' className={Style['main-title']}>
							Hi
							<br/>
							<GradientText
								to="#3d3def"
								from="#ff4646"
							>
								<strong>I'm Jo</strong>
							</GradientText>
						</Title>
					</ScrollAnimate>
				</ScrollAnimate>
			</StickySection>

			<StickySection secondary centered height="150vh">
				<ScrollAnimate
					animations={['appear', 'slide-down']}
					scrollStart={2200}
					scrollEnd={isMobile ? 2500 : 3000}
				>
					<Title as='h1' className={Style['secondary-title']}>
						I'm a
						<br/>
						<GradientText
							to="#3d3def"
							from="#ff4646"
						>
							<strong>fullstack tech lead</strong>
						</GradientText>
					</Title>
				</ScrollAnimate>
			</StickySection>
		</>
	);
}
