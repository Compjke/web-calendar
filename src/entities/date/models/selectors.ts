import { useStateSelector } from '@/app/store';

export const useDate = () => {
	const selectedDate = useStateSelector((s) => s.dateReducer.selectedDate);

	return { selectedDate };
};
