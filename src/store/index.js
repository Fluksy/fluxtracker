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

const appReducer = combineReducers({ i18n: i18nReducer, ...reducers});

export const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
	middlewares.push(logger);
}

const store = createStore(appReducer ,composeWithDevTools(applyMiddleware(...middlewares)))

syncTranslationWithStore(store);
store.dispatch(loadTranslations(translations));
store.dispatch(setLocale(DEFAULT_LANGUAGE));

export default store;
