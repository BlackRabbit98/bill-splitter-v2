import { createContext, useContext, useState } from 'react';

export type User = { name: string };
export type GroupCost = { name: string; cost: number };
export type IndividualCost = {
	receiver: string;
	payer: string;
	amount: number;
};
type State = {
	users: User[];
	handleUsers: (users: User[]) => void;
	groupCost: GroupCost[];
	handleGroupCost: (groupCost: GroupCost[]) => void;
	individualCosts: IndividualCost[];
	handleIndividualCost: (individualCosts: IndividualCost[]) => void;
};

const AppContext = createContext<State>({
	users: [],
	handleUsers: (users: User[]) => {},
	groupCost: [],
	handleGroupCost: (groupCost: GroupCost[]) => {},
	individualCosts: [],
	handleIndividualCost: (individualCost: IndividualCost[]) => {},
});

const EMPTY_USER_TEMPLATE = { name: '' };
const EMPTY_INDIVIDUAL_COST = {
	receiver: '',
	payer: '',
	amount: 0,
};

export function AppWrapper({ children }: { children: React.ReactNode }) {
	const [users, setUsers] = useState([EMPTY_USER_TEMPLATE]);
	const [groupCost, setGroupCost] = useState<GroupCost[]>([]);
	const [individualCosts, setIndividualCosts] = useState([
		EMPTY_INDIVIDUAL_COST,
	]);

	const handleUsers = (users: User[]) => {
		setUsers(users);
	};

	const handleGroupCost = (groupCost: GroupCost[]) => {
		setGroupCost(groupCost);
	};

	const handleIndividualCost = (individualCost: IndividualCost[]) => {
		setIndividualCosts(individualCost);
	};

	return (
		<AppContext.Provider
			value={{
				users,
				handleUsers,
				groupCost,
				handleGroupCost,
				individualCosts,
				handleIndividualCost,
			}}>
			{children}
		</AppContext.Provider>
	);
}

export function useAppContext() {
	return useContext(AppContext);
}
