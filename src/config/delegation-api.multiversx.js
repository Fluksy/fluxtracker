import * as axios from 'axios';

const delegationApiMultiversx = axios.create({
	baseURL: 'https://delegation-api.multiversx.com'
})

// Fetch delegation data from MultiversX API.
// Parameter can be an erd1 address
export const getProviders = async(erd1Address) => {
	return delegationApiMultiversx.get(`/accounts/${erd1Address}/delegations`);
}

// Fetch Service Provider data from MultiversX API.
// Parameter is a smart contract address
export const getProviderInfos = async(serviceProviderSmartContractAddress) => {
	return delegationApiMultiversx.get(`/providers/${serviceProviderSmartContractAddress}`);
}
