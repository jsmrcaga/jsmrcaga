import { classnames } from '../../utils';

import Style from './title.module.css';

export function Title({ children, as='h2', category=false, className, ...rest }) {
	const Component = as;
	return (
		<Component className={classnames(Style.title, className, {
			[Style.category]: category
		})} {...rest}>
			{ children }
		</Component>
	);
}
