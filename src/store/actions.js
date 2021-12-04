export const SET_EGLD_ADDRESS = 'set egld address';
export const SET_THEME = 'set theme';

export const app_theme = {
	DARK_THEME: 'dark',
	LIGHT_THEME: 'light'
} 

export const setAddress = (address) => {
	return {
		type: SET_EGLD_ADDRESS,
		address
	}
}

export const setTheme = (theme) => {
	return {
		type: SET_THEME,
		theme
	}
}


