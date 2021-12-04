import en from './en.json';
import fr from './fr.json';

export const KEY_LANGUAGE_LOCAL_STORAGE = 'user-language';

export const locales = {
	GB : en,
	FR : fr
};

export const DEFAULT_LANGUAGE = !!localStorage.getItem(KEY_LANGUAGE_LOCAL_STORAGE) ? localStorage.getItem(KEY_LANGUAGE_LOCAL_STORAGE) :  "GB";
