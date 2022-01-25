import * as axios from 'axios';

const delegationApiElrond = axios.create({
	baseURL: 'https://delegation-api.elrond.com'
})

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
