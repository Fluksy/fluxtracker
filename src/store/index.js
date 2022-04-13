import thunk from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from 'redux';
import {
	i18nReducer,
  setLocale,
  loadTranslations,
  syncTranslationWithStore,
} from "react-redux-i18n";
import * as reducers from './reducers'
import { DEFAULT_LANGUAGE, locales as translations } from "../locales";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import logger from 'redux-logger';
import { loadSearchHistory, saveSearchHistory } from "./localStorage";

const appReducer = combineReducers({ i18n: i18nReducer, ...reducers});

export const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
	middlewares.push(logger);
}

const persistedSearchHistory = loadSearchHistory();
const store = createStore(appReducer , persistedSearchHistory, composeWithDevTools(applyMiddleware(...middlewares)))

syncTranslationWithStore(store);
store.dispatch(loadTranslations(translations));
store.dispatch(setLocale(DEFAULT_LANGUAGE));

store.subscribe(() => {
	saveSearchHistory({
		searchHistory: store.getState().searchHistory,
	});
});

export default store;
