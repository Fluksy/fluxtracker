const { SmartContract, Address, ContractFunction, ProxyProvider, NetworkConfig, BytesValue } = require('@elrondnetwork/erdjs');

/**
 * Fetch data from the Elrond API
 * @param {string} erd1Address - erd1 address or herotag
 */
export default async (req, res) => {
	try
	{
		let provider = new ProxyProvider("https://gateway.elrond.com");
		await NetworkConfig.getDefault().sync(provider);

		let contract = new SmartContract({ address: new Address("erd1qqqqqqqqqqqqqpgqa0fsfshnff4n76jhcye6k7uvd7qacsq42jpsp6shh2") });

		let response = await contract.runQuery(provider, {
				func: new ContractFunction("getBurnedTokenAmount"),
				args: [BytesValue.fromHex('4D45582D343535633537')]
		});

		if (response.isSuccess() && !!response?.returnData[0]) {
				const encodedResponse = response?.returnData[0];
				const hexadecimalResponse = Buffer.from(encodedResponse, 'base64').toString('hex');
				const decimalResponse = parseInt(`0x${hexadecimalResponse}`);
				const beautifulResponse = decimalResponse / 1000000000000000000;
				res.status(200).json({mex_burned_amount: beautifulResponse})
		}
	} catch (error) {
			res.status(404).json({error})
	}
}
