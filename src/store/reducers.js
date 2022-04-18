import { app_theme, SET_ACCOUNT, SET_THEME, SET_PROVIDERS, ADD_TO_SEARCH_HISTORY, REMOVE_FROM_SEARCH_HISTORY, SET_EGLD_PRICE } from "./actions";

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

export const egldPrice = (state = 0, action) => {
	switch (action.type) {
		case SET_EGLD_PRICE:
			return action.egldPrice;
		default:
			return state;
	}
}

export const searchHistory = (state = [], action) => {
	switch (action.type) {
		case ADD_TO_SEARCH_HISTORY:
			// max 5 items in history
			if (state.includes(action.search)) {
				const search = state.filter(item => item !== action.search);
				return [action.search, ...search];
			}

			const history = [...state];
			if (history.length >= 5) {
				history.pop();
			}
			return [action.search, ...history];
		
		case REMOVE_FROM_SEARCH_HISTORY:
			return state.filter(item => item !== action.search);
		default:
			return state;
	}
}
