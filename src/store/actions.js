export const SET_ACCOUNT = 'set egld account';
export const SET_THEME = 'set theme';
export const SET_PROVIDERS = 'set providers';
export const ADD_TO_SEARCH_HISTORY = 'add to search history';
export const REMOVE_FROM_SEARCH_HISTORY = 'remove from search history';
export const SET_EGLD_PRICE = 'set egld price';

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

export const fetchEgldPrice = () => {
	return (dispatch) => {
		return fetch('https://data.elrond.com/latest/quoteshistorical/egld/price')
			.then(response => response.json())
			.then(price => {
				dispatch(setEgldPrice(price))
			})
	}
}
