import { getProviders } from '../../src/config/delegation-api.elrond';

/**
 * Fetch data from the Elrond API
 * @param {string} erd1Address - erd1 address or herotag
 */
export default async (req, res) => {
	const {data} = await getProviders(req.query.erd1Address);
	res.json(data);
}
