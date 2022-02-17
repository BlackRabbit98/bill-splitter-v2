/**
 * This function takes an array of objects reflecting per person costs with unique names as first parameter
 * and takes an object reflecting individual costs as second parameter.
 * Then, it splits the cost over to the minimum number of transactions and returns result as an object.
 * @param array [{name:string, costPerPerson: number}]
 * @param object {receiver1: {giver1: amount,..}}
 * @return {receiver1: {giver1: amount,..}}
 */

export const paySplitAlgo = (groupCostArray, individualCostObject) => {
	// Convert array to object as its easier to work with
	const groupCostObject = {};
	groupCostArray.forEach((item) => {
		groupCostObject[item.name] = item.costPerPerson;
	});

	// Calculate how much every one owes in total
	// Positive number means they receive money
	// Negative number means they pay money
	const clonedGroupCostObject = { ...groupCostObject };
	Object.entries(clonedGroupCostObject).forEach((entry, index, array) => {
		const totalCostsToPay = Object.values(clonedGroupCostObject).reduce(
			(accumulator, currentValue, currentIndex) => {
				if (currentIndex !== index) accumulator += currentValue;
				return accumulator;
			},
			0
		);
		groupCostObject[entry[0]] =
			entry[1] * (array.length - 1) - totalCostsToPay;
	});

	// Adjust the individual costing to the object
	// Add to receiver and Subtract from payer
	Object.keys(individualCostObject).map((key) => {
		Object.entries(individualCostObject[key]).forEach((entry) => {
			const receiverName = key;
			const payerName = entry[0];
			const amount = entry[1];

			groupCostObject[receiverName] += amount;
			groupCostObject[payerName] -= amount;
		});
	});

	// Split the cost to two arrays
	// Positive amount to receiver array
	// Negative amount to receiver array
	const receiver = [];
	const payer = [];

	Object.entries(groupCostObject).forEach((entry) => {
		if (entry[1] > 0) {
			receiver.push({ receiverName: entry[0], receiverAmount: entry[1] });
		} else if (entry[1] < 0) {
			payer.push({ payerName: entry[0], payerAmount: entry[1] });
		}
	});

	// Create final result object stating who pays whom
	// Format -> {receiver1: {giver1: amount,..}}
	const result = {};

	while (true) {
		if (!receiver.length || !payer.length) break;
		const { receiverName, receiverAmount } = receiver[0];
		const { payerName, payerAmount } = payer[0];

		const absoluteDifference = receiverAmount - Math.abs(payerAmount);
		const finalAmount = receiverAmount + payerAmount;

		if (!result.hasOwnProperty(receiverName)) result[receiverName] = {};

		if (absoluteDifference > 0) {
			receiver[0] = { ...receiver[0], receiverAmount: finalAmount };
			result[receiverName][payerName] = Math.abs(payerAmount).toFixed(1);
			payer.shift();
		} else {
			payer[0] = { ...payer[0], payerAmount: finalAmount };
			result[receiverName][payerName] = receiverAmount.toFixed(1);
			receiver.shift();
		}
	}

	return result;
};

export default paySplitAlgo;
