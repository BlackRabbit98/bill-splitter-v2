import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import ComponentContainer from '../components/ComponentContainer';
import { useAppContext } from '../context/state';

const GroupCost = () => {
	const { groupCost, handleGroupCost } = useAppContext();

	const router = useRouter();
	const handlePreviousPage = () => {
		router.push('/');
	};

	const handleNextClick = () => {
		router.push('/individual-cost');
	};

	return (
		<ComponentContainer currentStep={2} seoTitle="Group Costing">
			<Text
				fontFamily="Acme"
				color="#000000"
				fontSize={['22px', '32px']}
				py="10px">
				Step 2: Group Costing
			</Text>
			<Text
				fontSize={12}
				fontFamily="Adamina"
				color="#3B3B3B"
				align="center">
				Please add total group cost from each members.
			</Text>
			<Box as="form" py="25px" px="20px" w={['100%', '300px']}>
				{groupCost.map((user, index) => {
					return (
						<FormControl key={index} my={4}>
							<FormLabel
								fontSize={12}
								fontFamily="Adamina"
								color="#3A3A3A">
								{`${user.name}`}
							</FormLabel>
							<Input
								value={user.cost}
								placeholder="enter group cost "
								size="md"
								border="1.5px solid"
								borderColor="#BEBEBE"
								onChange={(e) => {
									const clonedValue = groupCost.map(
										(obj) => ({ ...obj })
									);
									// console.log(
									// 	'clonned value',
									// 	clonedValue
									// );
									clonedValue[index] = {
										...clonedValue[index],
										cost: Number(e.target.value),
									};
									handleGroupCost(clonedValue);
								}}
							/>
						</FormControl>
					);
				})}
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
					onClick={() => handleNextClick()}>
					Next
					<ArrowForwardIcon w={6} h={3.5} />
				</Button>
			</Flex>
		</ComponentContainer>
	);
};

export default GroupCost;
