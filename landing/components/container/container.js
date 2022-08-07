import React from 'react';
import Styles from './container.module.css';

import { classnames } from '../../utils';
import { useCSSScrolling } from '../../hooks';

export const Content = ({ children, className }) => {
	return (
		<div className={classnames(className, Styles['main-content'])}>
			{children}
		</div>
	);
};

export const Container = React.forwardRef(({ children, className }, ref) => {
	return (
		<div ref={ref} className={classnames(Styles['scroll-container'], className)}>
			{children}
		</div>
	);
});

const NAVIGATION_STATES = {
	MINIFIED: Styles['minify'],
	EXIT: classnames(Styles['minify'], Styles['exit']),
	ENTER: classnames(Styles['minify'], Styles['enter']),
	NONE: ''
}

const NavigationContext = React.createContext();

export const Navigator = ({ children }) => {
	const [navigationClasses, setNavigationClasses] = React.useState('');
	const [navigating, setNavigating] = React.useState(false);

	const [scrollerRef, setRef] = React.useState(null);

	const navigate = React.useCallback((onNavigationRequest) => {
		if(navigating) {
			return;
		}

		setNavigating(true);

		const reentry = () => {
			setTimeout(() => {
				setNavigationClasses(NAVIGATION_STATES.MINIFIED);

				setTimeout(() => {
					setNavigationClasses('');
					setNavigating(false);
				}, 700);
			}, 700);
		};

		// TODO: make Promise proxy
		setNavigationClasses(NAVIGATION_STATES.MINIFIED);

		setTimeout(() => {
			setNavigationClasses(NAVIGATION_STATES.EXIT);

			setTimeout(() => {
				setNavigationClasses(NAVIGATION_STATES.ENTER);

				// Call on navigated to allow parent to change children
				onNavigationRequest?.(reentry);
			}, 700);
		}, 700);

		return reentry;
		// 700ms is the duration of the transform transition
	}, [navigating]);

	return (
		<NavigationContext.Provider value={{
			navigationClasses,
			navigating,
			navigate,
			setRef,
			scrollerRef
		}}>
			{children}
		</NavigationContext.Provider>
	);
};

export const useNavigator = (ref) => {
	const ctx = React.useContext(NavigationContext);
	if(!ctx) {
		throw new Error('Did you forget to wrap in <Navigator>?');
	}

	React.useEffect(() => {
		if(ref?.current) {
			ctx.setRef(ref);
		}
	}, [ref, ctx]);

	return ctx;
};

export const ScrollContainer = React.forwardRef(({ children, onScrollEnd }, parentRef) => {
	const ref = React.useRef(null);

	const { navigationClasses, navigate } = useNavigator(ref);
		
	const { scrollEnded } = useCSSScrolling(ref, {
		throttle: false,
		onScrollEnd
	});

	React.useImperativeHandle(parentRef, () => {
		return {
			navigate
		};
	}, [navigate])

	return (
		<Container ref={ref} className={classnames(navigationClasses)}>
			{children}
		</Container>
	);
});
