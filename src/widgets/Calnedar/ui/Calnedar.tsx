import { useStateSelector } from '@/app/store';
import { getDaysBetweenCustom } from '../libs/getDatesRow';
import { TimeCells } from './TimeCells';
import { EventsDetails } from './EventDetails/EventsDetails';

import dayjs from 'dayjs';
import clsx from 'clsx';
import style from './calendar.module.scss';

export default function Calnedar() {
	const selectedDate = useStateSelector((s) => s.dateReducer.selectedDate);
	const viewMode = useStateSelector((s) => s.viweModeReducer.viewMode);
	const countDays = viewMode === 'Week' ? 7 : 1;

	return (
		<>
			<section className={style.calendar}>
				<div
					className={clsx(viewMode === 'Week' ? style.weekMode : style.dayMode)}
				>
					{getDaysBetweenCustom(selectedDate, countDays).map(
						(date, indDate) => (
							<div key={date.toString()} className={style.col}>
								<div className={style.wrapper} key={date.day()}>
									<div
										className={clsx(
											style.dayWeek,
											date.toDate().toDateString() ===
												dayjs().toDate().toDateString() && style.today
										)}
									>
										<span style={{ fontWeight: 700 }}>{date.date()}</span>
										<span className={style.day}>
											{date.format('ddd').toUpperCase()}
										</span>
									</div>
								</div>
								<TimeCells indDate={indDate} date={date} />
							</div>
						)
					)}
				</div>
			</section>
			<EventsDetails />
		</>
	);
}
