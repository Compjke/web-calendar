import { useAppDispatch } from '@/app/store';
import { useDate, setSelectedDateInSmall } from '@/entities/date';
import { DatePicker } from '@/shared/ui-kit/DatePicker';
import  { Dayjs } from 'dayjs';


export const DatePickerFeature = () => {
	const { selectedDate } = useDate();
	
	const dispatch = useAppDispatch();


	const handleDatePick = (date: Dayjs) => {
		dispatch(setSelectedDateInSmall(date));
	};
	return (
		<DatePicker
			selectedDate={selectedDate}
			onDatePick={handleDatePick}
		/>
	);
};

export default DatePickerFeature;
