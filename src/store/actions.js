export const SET_ACCOUNT = 'set egld account';
export const SET_THEME = 'set theme';
export const SET_PROVIDERS = 'set providers';

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
