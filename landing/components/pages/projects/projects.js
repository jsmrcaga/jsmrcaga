import {
	Section,
	IOICard,
	IOICardGroup,
	Header,
	Content,
	Title,
	Splash
} from '../../';

import Style from './projects.module.css';

export function Projects() {
	return (
		<>
			<Header/>
			<Section className={Style.padless}>
				<Splash/>
				<Content>
					<Title as="h2" category>Projects</Title>
				</Content>
				<IOICardGroup>
					<IOICard
						title="Blog & Site"
						transparent
						description={
							<span>
								My personal website, you are navigating it right now!
								Heavily inspired by <a href="https://ioi.dk" target="_blank">IOI's website</a>
							</span>
						}
						tags={['Design']}
						image="/images/splash.jpg"
					/>
					<IOICard
						title="control core"
						href="https://github.com/jsmrcaga/control-core"
						description="Graph task execution. Created to simplify Playwright-based front-end testing and allow access to Product Teams"
						tags={['Testing', 'Product']}
						image="/projects/control-logo-black.png"
						brightness={0.3}
						blur
					/>
					<IOICard
						title="V1"
						transparent
						size={3}
						description="A simple (and opinionated) deployment management system"
						tags={['Utils', 'WIP']}
						image="/images/splash.jpg"
					/>
					<IOICard
						title="Actions"
						href="https://github.com/jsmrcaga?tab=repositories&q=action-"
						description="Collection of different GitHub actions for various needs"
						tags={['GitHub', 'CI/CD']}
						image="/projects/actions.png"
						brightness={0.2}
						blur
					/>
					<IOICard
						title="Executor"
						size={2}
						href="https://github.com/jsmrcaga/executor"
						description="ORM for MongoDB heavily inspired by Django's ORM"
						tags={['Database']}
						image="/projects/mongodb-3.png"
						blur
						brightness={0.3}
					/>
					<IOICard
						title="Terraform Modules"
						href="https://github.com/jsmrcaga/terraform-modules"
						description="Collection of Terraform modules to simplify my projects' infrastructure management"
						tags={['Terraform', 'Infrastructure']}
						image="/projects/terraform.png"
						blur
						brightness={0.3}
					/>
				</IOICardGroup>
			</Section>
		</>
	);
}
