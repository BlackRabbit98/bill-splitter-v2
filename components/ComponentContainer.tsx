import { Flex, Text } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import HomeStyles from '../styles/Home.module.css';
import WizardStepper from './WizardStepper';

interface Props {
	children: React.ReactNode;
	seoTitle: string;
	title?: string;
	currentStep: number;
}

const wizardSteps = [
	{ num: 1, name: 'List Members' },
	{ num: 2, name: 'Group Costing' },
	{ num: 3, name: 'Individual Costing' },
	{ num: 4, name: 'Optimized Result' },
];

const ComponentContainer = ({
	seoTitle,
	title = 'Group Cost Calculator',
	currentStep,
	children,
}: Props) => {
	const gradientPercent =
		((currentStep - 1) / 4) * 100 +
		(currentStep < 2 ? -10 : 0) +
		(10 + currentStep);
	return (
		<div className={HomeStyles.homepage}>
			<Head>
				<title>{seoTitle}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Text
				fontSize={['20px', '48px']}
				fontFamily="Bevan"
				color="#000000"
				py="30px">
				{title}
			</Text>
			<Flex
				pb="30px"
				position="relative"
				w="90%"
				maxW={['90vw', '600px']}
				minHeight="100px"
				justify="center">
				<Flex
					minWidth="80%"
					height="2px"
					background={`linear-gradient(to right, #00AA30 ${gradientPercent}%, gray ${gradientPercent}%)`}
					mt={4}
				/>
				<Flex
					position="absolute"
					top="0"
					left="2px"
					zIndex={10}
					w="100%"
					justify={'space-between'}>
					{wizardSteps.map((step, index) => {
						return (
							<WizardStepper
								key={step.name + index}
								stepNumber={step.num}
								stepName={step.name}
								currentStep={currentStep}
							/>
						);
					})}
				</Flex>
			</Flex>
			<Flex
				bg="#FFFFFF"
				direction="column"
				align="center"
				pt="30px"
				pb="30px"
				w="90%"
				maxW={['100vw', '600px']}
				rounded={10}
				shadow="md">
				{children}
			</Flex>
		</div>
	);
};

export default ComponentContainer;
