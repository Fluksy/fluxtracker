import { getProviders } from '../../src/config/delegation-api.multiversx';

/**
 * Fetch data from the MultiversX API
 * @param {string} erd1Address - erd1 address or herotag
 */
export default async (req, res) => {
	const {data} = await getProviders(req.query.erd1Address);
	res.json(data);
}
