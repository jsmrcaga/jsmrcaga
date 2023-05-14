import {
	Section,
	IOICard,
	IOICardGroup,
	Header,
	Content,
	Title,
	Splash,
	WorksBestInChrome
} from '../../';

import Style from './projects.module.css';

export function Projects() {
	return (
		<>
			<WorksBestInChrome/>
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
						description="Programatic graph task execution. Created to simplify Playwright-based front-end testing and allow access to Product Teams but able to run anything (think NodeRed or n8n)"
						tags={['Testing', 'Product']}
						image="/projects/control-logo-black.png"
						brightness={0.3}
						blur
					/>
					<IOICard
						title="V1"
						transparent
						size={3}
						description="A simple (and opinionated) deployment management system."
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
					<IOICard
						title="Accounts"
						description="Our own Auth management service. Supports passkeys by default"
						tags={['Passkeys', 'Passwordless']}
						image="/projects/accounts.png"
						blur
						size={3}
					/>
					<IOICard
						title="pswd.app"
						description="A blockchain (Blockstack/Stacks) based password manager (deprecated)"
						tags={['Passwords']}
						transparent
						href="https://www.producthunt.com/products/pswd-app#pswd-app"
					/>
					<IOICard
						title="no.pswd.app"
						description="An authorization service based solely on WebAuthN. The cool kids call them Passkeys now"
						tags={['Passkeys', 'Passwordless']}
						image="/projects/no.pswd.png"
						size={2}
						blur
						brightness={0.2}
					/>
				</IOICardGroup>
			</Section>
		</>
	);
}
