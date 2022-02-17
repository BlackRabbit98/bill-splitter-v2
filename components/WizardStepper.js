import { CheckIcon } from '@chakra-ui/icons';
import { Circle, Flex, Text } from '@chakra-ui/react';
import React from 'react';

const WizardStepper = ({ stepNumber, stepName, currentStep }) => {
	return (
		<Flex direction="column" align="center" w="20vw" >
			<Circle
				backgroundColor="#DBDBDD"
				size="35px"
				border="2px solid"
				borderColor={stepNumber <= currentStep ? '#00AA30' : 'gray.500'}
				color="#000000">
				{stepNumber >= currentStep ? (
					stepNumber
				) : (
					<Circle
						backgroundColor="#00AA30"
						size="28px"
						color="#ffffff">
						<CheckIcon h={3} w={3} />
					</Circle>
				)}
			</Circle>
			<Text align="center" fontSize={['13px', '16px']}>
				{stepName}
			</Text>
		</Flex>
	);
};

export default WizardStepper;
