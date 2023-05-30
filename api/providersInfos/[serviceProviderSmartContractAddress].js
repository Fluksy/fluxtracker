import { getProviderInfos } from '../../src/config/delegation-api.multiversx';

/**
 * Fetch data from the MultiversX API
 * @param {string} serviceProviderSmartContractAddress - Smart contract address of the service provider
 */
export default async (req, res) => {
	const {data} = await getProviderInfos(req.query.serviceProviderSmartContractAddress);
	res.json(data);
}
