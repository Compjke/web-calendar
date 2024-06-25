import { DatePickerFeature } from '@/features/DatePicker/ui';

import { Calendars } from './Calendars';
import { CreateEventFeature } from '@/features/EventFeatures/ui';
import style from './sidebar.module.scss';

export const SideBar = () => {
	return (
		<aside className={style.sidebar}>
			<CreateEventFeature />

			<DatePickerFeature />

			<Calendars />
		</aside>
	);
};
