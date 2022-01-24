import * as axios from 'axios';

const apiElrond = axios.create({
	baseURL: 'https://api.elrond.com'
})

const delegationApiElrond = axios.create({
	baseURL: 'https://delegation-api.elrond.com'
})

/**
 * Fetch account data from Elrond API.
 * Parameter can be an erd1 address or herotag
 * @param {string} searchValue herotag or erd1 address
 * @returns 
 */
export const getAccount = async(searchValue) => {
	if (searchValue.length === 62 && searchValue.startsWith('erd1'))
		return apiElrond.get(`/accounts/${searchValue}`)

	return apiElrond.get(`/usernames/${searchValue}`)
}

// Fetch delegation data from Elrond API.
// Parameter can be an erd1 address
export const getProviders = async(erd1Address) => {
	return delegationApiElrond.get(`/accounts/${erd1Address}/delegations`);
}

// Fetch Service Provider data from Elrond API.
// Parameter is a smart contract address
export const getProviderInfos = async(serviceProviderSmartContractAddress) => {
	return delegationApiElrond.get(`/providers/${serviceProviderSmartContractAddress}`);
}
