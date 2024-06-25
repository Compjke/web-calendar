import { Calendar } from '@/entities/calendar';

import { useStateSelector } from '@/app/store';

import {
	CreateCalendarFeature,
	DeleteCalendarFeature,
	EditCalendarFeature,
} from '@/features/CalendarFeatures';
import style from './sidebar.module.scss';

export const Calendars = () => {
	const calendars = useStateSelector((s) => s.calendarReducer.allCalendars);
	return (
		<div className={style.calendars}>
			<div id='modalCalendars' className={style.modal}></div>
			<div className={style.calendarsTop}>
				<h3 className={style.calendarsTitle}>My calendars</h3>
				<CreateCalendarFeature />
			</div>

			<ul className={style.calendarsList}>
				{calendars.map((calendar) => (
					<li className={style.item} key={calendar.id}>
						<Calendar
							id={calendar.id}
							isDefault={calendar.isDefault}
							color={calendar.color}
							label={calendar.label}
						/>
						<div className={style.calendarActions}>
							<EditCalendarFeature calendar={calendar} />
							{!calendar.isDefault && (
								<DeleteCalendarFeature calendar={calendar} />
							)}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};
