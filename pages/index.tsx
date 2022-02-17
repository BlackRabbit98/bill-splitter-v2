import type { NextPage } from 'next';
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Text,
} from '@chakra-ui/react';
import { AddIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useAppContext } from '../context/state';
import { useRouter } from 'next/router';
import ComponentContainer from '../components/ComponentContainer';

const EMPTY_USER_TEMPLATE = { name: '' };

const Home: NextPage = () => {
	const { users, groupCost, handleGroupCost, handleUsers } = useAppContext();
	const router = useRouter();

	const handleNextClick = () => {
		const groupState = users.map((user, index) => {
			return groupCost[index]
				? groupCost[index]
				: {
						name: user.name,
						cost: 0,
				  };
		});
		handleGroupCost(groupState);

		router.push('/group-cost');
	};

	return (
		<ComponentContainer currentStep={1} seoTitle="Bill Splitter">
			<Text fontFamily="Acme" color="#000000" fontSize={["22px", "32px"]} py="10px">
				Step 1: List Members
			</Text>
			<Text fontSize={12} fontFamily="Adamina" color="#3B3B3B" align="center">
				Please add members involved in group costing below.
			</Text>
			<Box as="form" py="25px" px="20px" w={['100%', '300px']}>
				{users.map((user, index) => {
					return (
						<FormControl key={index} my={4}>
							<FormLabel
								fontSize={12}
								fontFamily="Adamina"
								color="#3A3A3A">
								{`Person ${index + 1}`}
							</FormLabel>
							<Input
								value={user.name}
								onChange={(e) => {
									const clonedValue = users.map((user) => ({
										...user,
									}));
									clonedValue[index] = {
										...clonedValue[index],
										name: e.target.value,
									};
									handleUsers(clonedValue);
								}}
								placeholder="enter name "
								size="md"
								border="1.5px solid"
								borderColor="#BEBEBE"
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
					onClick={() =>
						handleUsers([...users, { ...EMPTY_USER_TEMPLATE }])
					}>
					Add
					<AddIcon w={6} h={2.5} />
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

export default Home;
