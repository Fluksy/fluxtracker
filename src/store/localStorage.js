export const loadSearchHistory = () => {
	try {
		const serializedState = localStorage.getItem('search_history');
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
}

export const saveSearchHistory = (searchHistory) => {
	try {
		const serializedState = JSON.stringify(searchHistory);
		localStorage.setItem('search_history', serializedState);
	} catch (err) {
		// ignore write errors
	}
}
