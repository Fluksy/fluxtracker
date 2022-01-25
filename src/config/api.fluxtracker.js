import * as axios from 'axios';

const fluxtrackerApi = axios.create({
	baseURL: 'https://api.fluxtracker.fr'
})

// Fetch delegation data from Elrond API.
// Parameter can be an erd1 address
export const getProviders = async(erd1Address) => {
	return fluxtrackerApi.get(`/accounts/${erd1Address}/delegations`);
}

// Fetch Service Provider data from Elrond API.
// Parameter is a smart contract address
export const getProviderInfos = async(serviceProviderSmartContractAddress) => {
	return fluxtrackerApi.get(`/providers/${serviceProviderSmartContractAddress}`);
}
