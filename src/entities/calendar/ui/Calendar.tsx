import { CheckBox } from '@/shared/ui-kit/CheckBox';
import { ICalendar, toggleSelectedCalendar } from '../model';
import { useAppDispatch, useStateSelector } from '@/app/store';

import style from './calendar.module.scss';

export default function Calendar(calendar: ICalendar) {
	const dispatch = useAppDispatch();
	const activeCalendars = useStateSelector(
		(s) => s.calendarReducer.selectedCalendars
	);

	const handleCahnge = (isCheked: boolean) => {
		dispatch(
			toggleSelectedCalendar({
				calendarId: calendar.id,
				isCheked,
			})
		);
	};

	return (
		<div className={style.calendarItem}>
			<CheckBox
				isCheckedByDefault={activeCalendars.includes(calendar.id)}
				onToogleCalendarState={handleCahnge}
				color={calendar.color}
				label={calendar.label}
				className={style.checkbox}
			/>
		</div>
	);
}
