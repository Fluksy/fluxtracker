export const convertToReadableEgldAmount = (amount, toFixed = 4) => {
	const amountInEgld = amount / 1000000000000000000;
	return amountInEgld.toFixed(toFixed);
}
