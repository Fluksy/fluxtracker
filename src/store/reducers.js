import { app_theme, SET_ACCOUNT, SET_THEME } from "./actions";

export const account = (state = {}, action) => {
	switch (action.type) {
		case SET_ACCOUNT:
			return action.account
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
