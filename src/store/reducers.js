import { app_theme, SET_EGLD_ADDRESS, SET_THEME } from "./actions";

export const address = (state = '', action) => {
	switch (action.type) {
		case SET_EGLD_ADDRESS:
			return action.address
		default:
			return state;
	}
}

export const theme = (state = app_theme.DARK_THEME, action) => {
	switch (action.type) {
		case SET_THEME:
			return action.theme;
		default:
			return state;
	}
}
