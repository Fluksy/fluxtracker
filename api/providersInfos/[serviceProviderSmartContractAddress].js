import { getProviderInfos } from '../../src/config/delegation-api.elrond';

/**
 * Fetch data from the Elrond API
 * @param {string} serviceProviderSmartContractAddress - Smart contract address of the service provider
 */
export default async (req, res) => {
	const {data} = await getProviderInfos(req.query.serviceProviderSmartContractAddress);
	res.json(data);
}
