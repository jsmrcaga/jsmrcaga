import React from 'react';

import { useNavigator } from '../container/container';

const RouterContext = React.createContext();

export function Router({ children }) {
	const { navigate } = useNavigator();
	const [location, setLocation] = React.useState('');

	React.useEffect(() => {
		// This is a hack because we are making a SPA on next
		setLocation(globalThis.window?.location.pathname || '/');
	}, []);

	React.useEffect(() => {
		const listener = (event) => {
			if(!event.state) {
				return;
			}

			console.log(event);

			const { state: { as } } = event;
			navigate(done => {
				setLocation(as);
				done();
			});
		};

		globalThis.window?.addEventListener('popstate', listener);
		return () => globalThis.window?.addEventListener('popstate', listener);
	}, [navigate]);

	const push = React.useCallback((pathname, state) => {
		globalThis.window?.history.pushState(state, null, pathname);

		navigate((done) => {
			// TODO: filter query params
			setLocation(pathname);
			done();
		});
	}, [navigate]);

	return (
		<RouterContext.Provider value={{ location, push }}>
			{children}
		</RouterContext.Provider>
	);
}

export function useRouter() {
	return React.useContext(RouterContext);
}

export function Route({ path='/', children }) {
	const { location } = useRouter();

	if(path !== location) {
		return null;
	}

	return children;
}
