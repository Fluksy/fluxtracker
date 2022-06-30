import * as axios from 'axios';

const fluxtrackerApi = axios.create({
	baseURL: '/api'
})

export const getProviders = async(erd1Address) => {
	return fluxtrackerApi.get(`/provider/${erd1Address}`);
}

export const getProviderInfos = async(serviceProviderSmartContractAddress) => {
	return fluxtrackerApi.get(`/providersInfos/${serviceProviderSmartContractAddress}`);
}

export const getBurnedMexTokens = async() => {
	return fluxtrackerApi.get(`/burned-mex-amount`);
}
