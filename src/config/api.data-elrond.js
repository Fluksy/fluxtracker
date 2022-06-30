import * as axios from 'axios';

const apiDataElrond = axios.create({
	baseURL: 'https://data.elrond.com'
})

/**
 * Fetch account data from Elrond API.
 * @returns EGLD price in USD
 */
export const getEgldPrice = async() => {
	const {data: elgdPriceUSD} = await apiDataElrond.get(`/latest/quoteshistorical/egld/price`)
	return elgdPriceUSD;
}
