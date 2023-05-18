import React from 'react';
import Head from 'next/head';

import {
	Control,
	Router,
	Route,
	useRouter,
	ScrollContainer,
	SVGTurbulence,
	Navigator
} from '../components';

import {
	Home,
	Projects,
	Experience
} from '../components/pages'

import { useConsoleMessage } from '../hooks/console';

import Style from '../styles/index.module.css';


function MainScroller() {
	const { location, push } = useRouter();

	useConsoleMessage();

	const throttle = React.useRef(null);
	const throttledPush = React.useCallback((...args) => {
		if(throttle.current) {
			return;
		}

		push(...args);

		throttle.current = true;
		setTimeout(() => {
			throttle.current = false;
		}, 1500);
	}, [push, throttle]);

	return (
		<ScrollContainer
			onScrollEnd={() => {
				if(location !== '/') {
					return;
				}

				throttledPush('/projects');
			}}
		>
			<Route path='/'>
				<Home/>
			</Route>

			<Route path="/experience">
				<Experience/>
			</Route>

			<Route path="/projects">
				<Projects/>
			</Route>
		</ScrollContainer>
	);
}

export default function Main() {
	return (
		<Navigator>
			<Router>
				<Head>
					<title>Jo Colina | Fullstack Tech Lead</title>
					<meta name="description" content="" />
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<SVGTurbulence/>

				<Control/>

				<MainScroller/>
			</Router>
		</Navigator>
	)
}
