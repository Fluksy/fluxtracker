import { app_theme, SET_ACCOUNT, SET_THEME, SET_PROVIDERS } from "./actions";

export const account = (state = null, action) => {
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

export const providers = (state = [], action) => {
	switch (action.type) {
		case SET_PROVIDERS:
			return action.providers;
		
		default:
			return state;
	}
}
