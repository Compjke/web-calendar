import { useEffect, useRef } from 'react';

export const useTimeout = (cb: () => void, time: number = 2000) => {
	const cachedCallBack = useRef(cb);

	useEffect(() => {
		cachedCallBack.current = cb;
	}, [cb]);

	useEffect(() => {
		const fn_Id = setTimeout(() => {
			cachedCallBack.current();
		}, time);

		return () => clearTimeout(fn_Id);
	}, [time]);
};
