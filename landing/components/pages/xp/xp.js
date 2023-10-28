import React from 'react';
import {
	StickySection,
	Title,
	ScrollAnimate,
	Overlay,
	GradientText,
	Header,
	Splash,
	Content,
	WorksBestInChrome
} from '../../';

import { classnames } from '../../../utils/classnames';

import Style from './xp.module.css';

function Grid({ children, className }) {
	return (
		<Content className={classnames(Style.grid, className)}>
			{children}
		</Content>
	);
}

function ExperienceItem({ title, dates, description, children }) {
	return (
		<div className={Style['xp-item']}>
			<span className={Style['job-title']}>
				{title}
			</span>
			<span className={Style.dates}>
				{dates}
			</span>
			<p>
				{description}
				{children}
			</p>
		</div>
	);
}

export function Experience() {
	return (
		<>
			<Overlay/>
			<WorksBestInChrome/>

			<StickySection centered>
				<Header/>
				<Splash/>

				<ScrollAnimate
					animations={['scale-down', 'slide-up', 'appear']}
					scrollStart={0}
					scrollEnd={1200}
				>
					<Grid>
						<ExperienceItem
							title="Engineering Manager"
							dates="2023 - present"
						>
							Currently leading a team of 4 developers on the Accounting team. Our mission is to facilitate accounting tasks for both Shine users & their accountants.
						</ExperienceItem>

						<Title as='h1' className={classnames(Style['company-title'], Style['mobile-text'])}>
							<GradientText
								to="#3d3def"
								from="#ff4646"
							>
								<strong>Shine</strong>
							</GradientText>
						</Title>
					</Grid>
				</ScrollAnimate>
			</StickySection>

			<StickySection  height="100vh" centered secondary>

				<ScrollAnimate
					animations={['scale-down', 'slide-up', 'appear']}
					magic
				>
					<Grid>
						<Title as='h1' className={classnames(Style['company-title'], Style['mobile-text'])}>
							<GradientText
								to="#3d3def"
								from="#ff4646"
							>
								<strong>HireSweet</strong>
							</GradientText>
						</Title>

						<ExperienceItem
							title="Lead Developer / Tech lead"
							dates="2022 - 2023"
						>
							Led a team of 2 to 4 developers with the objective to set good coding practices and streamline the development and product pipelines.
							<br/>
							<br/>
							Installed CI/CD pipelines (+ unit testing) as well as guidelines for versioning and deployments, added documentation and helped
							refactor some sections of the codebase.
							<br/>
							<br/>
							Developed critical features for the new product which helped secure important deals.
							<br/>
							<br/>
							Owned technical aspects of the SOC2 certification 🔒.
						</ExperienceItem>

					</Grid>
				</ScrollAnimate>
			</StickySection>

			<StickySection height="100vh" centered>
				<Splash/>
				<ScrollAnimate
					animations={['slide-down', 'scale-down', 'appear']}
					// scrollStart={2000}
					// scrollEnd={3100}
					magic
				>
					<Grid>
						<ExperienceItem
							title="Lead Developer / Tech lead"
							dates="2018 - 2022"
						>
							Led a team of 2 to 6 developers, and helped them add new features to
							the product as well as manage a complex system migration.
							Worked tightly with the Product team to ensure deadlines were (mostly) met
							and business use-cases were taken care of, while maintaining high code maintanability and flexibility.
							<br/>
							<br/>
							I learnt a lot from this experience both in the technical and management aspects, being led by both the current and previous CTOs, and
							by learning on the spot with the team. We managed to build very nice success stories, both on the devs' carreers and the product we shipped 🎉.
						</ExperienceItem>

						<Title as='h1' className={classnames(Style['company-title'], Style['mobile-text'])}>
							<GradientText
								to="#3d3def"
								from="#ff4646"
							>
								<strong>Weezevent</strong>
							</GradientText>
						</Title>

					</Grid>
				</ScrollAnimate>
			</StickySection>

			<StickySection height="100vh" centered secondary>

				<ScrollAnimate
					animations={['scale-down', 'slide-down', 'appear']}
					// scrollStart={3100}
					// scrollEnd={4200}
					magic
				>
					<Grid>
						<Title as='h1' className={classnames(Style['company-title'], Style['mobile-text'])}>
							<GradientText
								to="#3d3def"
								from="#ff4646"
							>
								<strong>Bottomatik</strong>
							</GradientText>
						</Title>

						<ExperienceItem
							title="Co-founder / CEO"
							dates="2016 - 2018"
						>
							Co-founded and developed the framework for <a href="https://www.youtube.com/watch?v=7AxUJLv30l8">Bottomatik</a>, a chatbot startup aiming to bring
							AI assistants to participants in events and simplify communication & sales for organisers.
							<br/><br/>
							We were mentored by 3 business angels during a 6-month period and secured 250K € for a seed series investment 💰.
						</ExperienceItem>
					</Grid>
				</ScrollAnimate>
			</StickySection>

			<StickySection height="100vh" centered>
				<Splash/>
				<ScrollAnimate
					animations={['scale-down', 'appear']}
					// scrollStart={4200}
					// scrollEnd={5300}
					magic
				>
					<Title as='h1' className={classnames(Style['company-title'], Style['mobile-text'])}>
						And more as a
						<GradientText
							to="#3d3def"
							from="#ff4646"
						>
							<strong>&nbsp;freelancer</strong>
						</GradientText>
					</Title>
				</ScrollAnimate>
			</StickySection>
		</>
	);
}
