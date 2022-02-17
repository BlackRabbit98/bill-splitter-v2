import { AddIcon, ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Flex,
	FormControl,
	Input,
	Select,
	Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import ComponentContainer from '../components/ComponentContainer';
import { useAppContext } from '../context/state';

const EMPTY_INDIVIDUAL_COST = {
	receiver: '',
	payer: '',
	amount: 0,
};

const IndividualCost = () => {
	const { users, individualCosts, handleIndividualCost } = useAppContext();

	const router = useRouter();
	const handlePreviousPage = () => {
		router.push('/group-cost');
	};
	const handleNextClick = () => {
		//console.log(individualCosts);
		handleIndividualCost(individualCosts);
		router.push('/results');
	};

	return (
		<ComponentContainer currentStep={3} seoTitle="Individual Costing">
			<Text
				fontFamily="Acme"
				color="#000000"
				fontSize={['22px', '32px']}
				py="10px">
				Step 3: Individual Costing
			</Text>
			<Text
				fontSize={12}
				fontFamily="Adamina"
				color="#3B3B3B"
				align="center">
				Please add total individual cost for each members.
			</Text>

			<Box as="form" py="25px" w={['100%', '600px']}>
				{individualCosts.map((obj, index) => (
					<Flex key={index} direction="column" px={2}>
						<Text size="small" fontWeight="bold" color="gray.500">
							Cost {index + 1}
						</Text>
						<Flex w="100%" mb={4} align="center">
							<Select
								placeholder="Receiver"
								border="1.5px solid"
								borderColor="#BEBEBE"
								py={1}
								value={obj.receiver}
								onChange={(e) => {
									const clonedValue = individualCosts.map(
										(obj) => ({
											...obj,
										})
									);
									clonedValue[index] = {
										...clonedValue[index],
										receiver: e.target.value,
									};
									handleIndividualCost(clonedValue);
								}}>
								{users.map((user, index) => (
									<option key={index} value={user.name}>
										{user.name}
									</option>
								))}
							</Select>
							<Select
								placeholder="Payer"
								border="1.5px solid"
								borderColor="#BEBEBE"
								py={1}
								value={obj.payer}
								onChange={(e) => {
									const clonedValue = individualCosts.map(
										(obj) => ({
											...obj,
										})
									);
									clonedValue[index] = {
										...clonedValue[index],
										payer: e.target.value,
									};
									//console.log('receiver', e.target.value);
									handleIndividualCost(clonedValue);
								}}>
								{users.map((user, index) => (
									<option key={index} value={user.name}>
										{user.name}
									</option>
								))}
							</Select>

							<FormControl>
								<Input
									placeholder="enter cost"
									size="md"
									border="1.5px solid"
									borderColor="#BEBEBE"
									value={obj.amount}
									onChange={(e) => {
										const clonedValue = individualCosts.map(
											(obj) => ({
												...obj,
											})
										);
										clonedValue[index] = {
											...clonedValue[index],
											amount: Number(e.target.value),
										};
										handleIndividualCost(clonedValue);
									}}
								/>
							</FormControl>
						</Flex>
					</Flex>
				))}
			</Box>

			<Flex
				pb="30px"
				justifyContent="space-between"
				px={['10px', '45px']}
				w="100%">
				<Button
					border="1.5px solid"
					bg="white"
					onClick={() =>
						handleIndividualCost([
							...individualCosts,
							{ ...EMPTY_INDIVIDUAL_COST },
						])
					}>
					Add
					<AddIcon w={6} h={3.5} />
				</Button>
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

export default IndividualCost;
