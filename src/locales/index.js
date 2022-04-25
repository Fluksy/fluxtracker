import en from './en.json';
import fr from './fr.json';
import ro from './ro.json';
import es from './es.json';

export const KEY_LANGUAGE_LOCAL_STORAGE = 'user-language';

export const locales = {
	GB : en,
	RO : ro,
	ES : es,
	FR : fr
};

export const customLabels = {
	GB : 'EN',
	FR : 'FR',
	RO : 'RO',
	ES : 'ES',
}

export const DEFAULT_LANGUAGE = !!localStorage.getItem(KEY_LANGUAGE_LOCAL_STORAGE) ? localStorage.getItem(KEY_LANGUAGE_LOCAL_STORAGE) :  "GB";
