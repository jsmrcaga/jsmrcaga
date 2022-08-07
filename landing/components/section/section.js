import { classnames } from '../../utils'
import Style from './section.module.css';

export function Section({ children, className, as='section', secondary, centered, ...rest }) {
	const Component = as;

	const classes = classnames(className, Style.section, {
		[Style.centered]: centered,
		[Style.secondary]: secondary
	});

	return (
		<Component className={classes} {...rest}>
			{children}
		</Component>
	);
}

export function StickySectionContainer({ children, className, height='300vh' }) {
	return (
		<div className={classnames(className, Style.sticky)} style={{
			'--height': height || '300vh'
		}}>
			{children}
		</div>
	);
}

export function StickySection({ children, height, ...rest }) {
	return (
		<StickySectionContainer height={height}>
			<Section {...rest}>
				{children}
			</Section>
		</StickySectionContainer>
	);
}
