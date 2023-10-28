import React from 'react';
import {
	StickySection,
	Title,
	ScrollAnimate,
	Overlay,
	GradientText,
	Header,
	Splash,
	useNavigator,
	Section,
	WorksBestInChrome
} from '../../';

import Style from './home.module.css';

function MobileOnly({ children }) {
	return <span className={Style["mobile-only"]}>{children}</span>
}

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
			<WorksBestInChrome/>
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
					className={Style["mobile-ready"]}
				>
					<Title as='h1' className={Style['secondary-title']}>
						I'm an
						<br/>
						<GradientText
							to="#3d3def"
							from="#ff4646"
						>
							<strong>engineering manager</strong>
						</GradientText>
					</Title>
				</ScrollAnimate>
			</StickySection>

			<Section centered>
				<Title as='h1' className={Style['secondary-title']}>
					I've led engineering teams @
					<br/>
					<GradientText
						to="#3d3def"
						from="#ff4646"
					>
						<strong>
							<a href="https://shine.fr?ref=jocolina.com">Shine</a>
							,&nbsp;<MobileOnly><br/></MobileOnly>
							<a href="https://hiresweet.com?ref=jocolina.com">HireSweet</a>
							&nbsp;&&nbsp;<MobileOnly><br/></MobileOnly>
							<a href="https://weezevent.com?ref=jocolina.com">Weezevent</a>
						</strong>
					</GradientText>
				</Title>
			</Section>

			<Section centered secondary>
				<Title as='h1' className={Style['secondary-title']}>
					But I also enjoy working on 
					<br/>
					<GradientText
						to="#3d3def"
						from="#ff4646"
					>
						<strong>personal projects</strong>
					</GradientText>
				</Title>
			</Section>
		</>
	);
}
