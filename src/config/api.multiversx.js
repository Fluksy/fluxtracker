import * as axios from 'axios';

const multiversxApi = axios.create({
	baseURL: 'https://api.multiversx.com'
})

/**
 * Fetch account data from MultiversX API.
 * Parameter can be an erd1 address or herotag
 * @param {string} searchValue herotag or erd1 address
 * @returns 
 */
export const getAccount = async(searchValue) => {
	if (searchValue.length === 62 && searchValue.startsWith('erd1'))
		return multiversxApi.get(`/accounts/${searchValue}`)

	return multiversxApi.get(`/usernames/${searchValue}`)
}

export const getEconomics = async() => {
	const {data} = await multiversxApi.get('/mex-economics');
	return data;
}

