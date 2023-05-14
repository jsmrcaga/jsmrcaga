import { classnames } from '../../utils/classnames';

import { useRouter } from '../router/router';

import Style from './header.module.css';

function Li({ children, active, className, ...rest }) {
	return (
		<li className={classnames(className, {
			[Style.active]: active
		})} {...rest}>
			{children}
		</li>
	);
}

function MobileText({ mobile, children }) {
	return (
		<span className={Style['responsive-text']}>
			{
				mobile && <span className={Style['mobile-text']}>
					{ mobile }
				</span>
			}
			<span className={Style['desktop-text']}>
				{children}
			</span>
		</span>
	);
}

export function Header() {
	const { location, push } = useRouter();

	return (
		<div className={Style.container}>
			<div className={Style.header}>
				<img src="/jo-logo.png"/>
				<ul>
					<Li
						active={location === '/'}
						onClick={() => push('/')}
					>
						Home
					</Li>
					<Li
						active={location === '/projects'}
						onClick={() => push('/projects')}
					>
						Projects
					</Li>
					<Li
						active={location === '/experience'}
						onClick={() => push('/experience')}
					>
						<MobileText mobile="XP">Experience</MobileText>
					</Li>
					<Li
						active={location === '/blog'}
						// onClick={() => push('/blog')}
						className={Style.disabled}
					>
						Blog
					</Li>

					<Li className={Style.img}>
						<a href="https://github.com/jsmrcaga">
							<img src="/icons/github.png"/>
						</a>
					</Li>

					<Li className={Style.img}>
						<a href="https://linkedin.com/in/jocolina">
							<img src="/icons/linkedin.png"/>
						</a>
					</Li>

				</ul>
			</div>
		</div>
	);
}
