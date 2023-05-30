import { getEgldPrice } from "../config/api.data-multiversx";
import { getEconomics } from "../config/api.multiversx";
import { getBurnedMexAmount } from "../config/smart-contract/api.mex";

export const SET_ACCOUNT = 'set egld account';
export const SET_THEME = 'set theme';
export const SET_PROVIDERS = 'set providers';
export const ADD_TO_SEARCH_HISTORY = 'add to search history';
export const REMOVE_FROM_SEARCH_HISTORY = 'remove from search history';
export const SET_EGLD_PRICE = 'set egld price';
export const SET_BURNED_MEX_AMOUNT = 'set burned mex amount';
export const SET_MEX_ECONOMICS = 'set mex economics';

export const app_theme = {
	DARK_THEME: 'dark',
	LIGHT_THEME: 'light'
} 

export const setAccount = (account) => {
	return {
		type: SET_ACCOUNT,
		account
	}
}

export const setTheme = (theme) => {
	return {
		type: SET_THEME,
		theme
	}
}

export const setProviders = (providers) => {
	return {
		type: SET_PROVIDERS,
		providers
	}
}

export const addToSearchHistory = (search) => {
	return {
		type: ADD_TO_SEARCH_HISTORY,
		search
	}
}

export const removeFromSearchHistory = (search) => {
	return {
		type: REMOVE_FROM_SEARCH_HISTORY,
		search
	}
}

export const setEgldPrice = (egldPrice) => {
	return {
		type: SET_EGLD_PRICE,
		egldPrice
	}
}

export const setBurnedMexAmount = (burnedMexAmount) => {
	return {
		type: SET_BURNED_MEX_AMOUNT,
		burnedMexAmount
	}
}

export const setMexEconomics = (mexEconomics) => {
	return {
		type: SET_MEX_ECONOMICS,
		mexEconomics
	}
}

export const fetchEgldPrice = () => {
	return (dispatch) => {
		return getEgldPrice()
			.then(price => {
				dispatch(setEgldPrice(price))
			})
	}
}

export const fetchBurnedMexAmount = () => {
	return (dispatch) => {
		return getBurnedMexAmount()
			.then((mex_burned_amount) => {
				dispatch(setBurnedMexAmount(mex_burned_amount))
			})
	}
}

export const fetchMexEconomics = () => {
	return (dispatch) => {
		return getEconomics()
			.then(mexEconomics => {
				dispatch(setMexEconomics(mexEconomics))
			})
	}
}
