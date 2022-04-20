import { getEconomics } from '../src/config/api.elrond';

/**
 * Fetch data from the Elrond API
 * @param {string} erd1Address - erd1 address or herotag
 */
export default async (req, res) => {
	const {data} = await getEconomics();
	res.json(data);
}
