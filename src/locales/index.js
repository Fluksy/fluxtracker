import en from './en.json';
import fr from './fr.json';
import ro from './ro.json';
import es from './es.json';

export const KEY_LANGUAGE_LOCAL_STORAGE = 'user-language';

export const locales = {
	GB : en,
	FR : fr,
	RO : ro,
	ES : es
};

export const DEFAULT_LANGUAGE = !!localStorage.getItem(KEY_LANGUAGE_LOCAL_STORAGE) ? localStorage.getItem(KEY_LANGUAGE_LOCAL_STORAGE) :  "GB";
