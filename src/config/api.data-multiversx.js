import * as axios from 'axios';

const apiDataMultiversx = axios.create({
	baseURL: 'https://data.multiversx.com'
})

/**
 * Fetch account data from Multiversx API.
 * @returns EGLD price in USD
 */
export const getEgldPrice = async() => {
	const {data: elgdPriceUSD} = await apiDataMultiversx.get(`/latest/quoteshistorical/egld/price`)
	return elgdPriceUSD;
}
