import { ArrowBackIcon, RepeatIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import ComponentContainer from '../components/ComponentContainer';
import { IndividualCost, useAppContext } from '../context/state';
import paySplitAlgo from '../utils/paySplitAlgo';

const Result = () => {
	const { individualCosts, groupCost } = useAppContext();

	const groupCostArray = groupCost.map((cost) => ({
		name: cost.name,
		costPerPerson: cost.cost / groupCost.length,
	}));

	const individualCostObject = individualCosts.reduce<Record<string, any>>(
		(acc, obj) => {
			if (!acc.hasOwnProperty(obj.receiver)) acc[obj.receiver] = {};
			acc[obj.receiver] = {
				...acc[obj.receiver],
				[obj.payer]: obj.amount,
			};
			return acc;
		},
		{}
	);

	const split = paySplitAlgo(groupCostArray, individualCostObject);

	const resultArray: IndividualCost[] = [];
	Object.entries(split).forEach(([receiver, value]) => {
		Object.entries(value as Record<string, number>).forEach(
			([payer, amount]) => {
				resultArray.push({ receiver, payer, amount });
			}
		);
	});

	console.log(resultArray);

	const router = useRouter();
	const handlePreviousPage = () => {
		router.push('/individual-cost');
	};
	const handleRecalculation = () => {
		router.push('/');
	};

	return (
		<ComponentContainer currentStep={5} seoTitle="Optimized Result">
			<Text
				fontFamily="Acme"
				color="#000000"
				py="10px"
				fontSize={['22px', '32px']}>
				Step 3: Optimized Result
			</Text>
			<Text
				fontSize={12}
				fontFamily="Adamina"
				color="#3B3B3B"
				align="center">
				Below is the result of group cost calculation.
			</Text>

			<Box as="form" py="25px" px="20px" w={['100%', '600px']}>
				<Grid templateColumns="repeat(3, 1fr)" bg="gray.50">
					<GridItem w="100%" h={8} borderWidth="1px">
						Receiver
					</GridItem>
					<GridItem w="100%" h={8} borderWidth="1px">
						Payer
					</GridItem>
					<GridItem w="100%" h={8} borderWidth="1px">
						Amount
					</GridItem>
				</Grid>
				{resultArray.map((arr, index) => (
					<Grid key={index} templateColumns="repeat(3, 1fr)">
						<GridItem w="100%" h={8} borderWidth="1px">
							{arr.receiver}
						</GridItem>
						<GridItem w="100%" h={8} borderWidth="1px">
							{arr.payer}
						</GridItem>
						<GridItem w="100%" h={8} borderWidth="1px">
							{arr.amount}
						</GridItem>
					</Grid>
				))}
			</Box>

			<Flex
				pb="30px"
				justifyContent="space-between"
				px="20px"
				w={['100%', '300px']}>
				<Button
					border="1.5px solid"
					bg="white"
					onClick={() => handlePreviousPage()}>
					<ArrowBackIcon w={6} h={3.5} />
					Prev
				</Button>

				<Button
					border="1.5px solid"
					bg="black"
					color="white"
					onClick={() => handleRecalculation()}>
					Home
					<RepeatIcon w={6} h={3.5} />
				</Button>
			</Flex>
		</ComponentContainer>
	);
};

export default Result;

/*
const groupCosting = [
	{ name: 'Sum', costPerPerson: 28.7 }, 143.5
	{ name: 'Praf', costPerPerson: 189.2 }, 946
	{ name: 'Dib', costPerPerson: 32.8 }, 164
	{ name: 'Sam', costPerPerson: 60 }, 300
	{ name: 'Diw', costPerPerson: 30.56 }, 152.8
];

const individualCosting = {
	Sam: {
		Diw: 63,
		Sum: 2.8,
		Dib: 2.8,
	},
	Dib: {
		Diw: 4.9,
		Sam: 7.9,
	},
	Praf: {
		Diw: 29.9,
		Sam: 20.58,
	},
};
 */
