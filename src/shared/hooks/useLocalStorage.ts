import { useState, useEffect } from 'react';

export const useLocalStorage = (key: string, defaultData: string = 'light') => {
	const [state, setState] = useState(() => {
		const localData = localStorage.getItem(key);
		return localData || defaultData;
	});
	useEffect(() => {
		localStorage.setItem(key, state);
	}, [key, state]);

	return [state, setState];
};
