import { setWatchedEvents } from '@/entities/event/model/eventSlice';
import { Modal } from '@/shared/ui-kit/Modal';
import { Icon } from '@/shared/ui-kit/Icon';

import dayjs from 'dayjs';

import { useAppDispatch, useStateSelector } from '@/app/store';

import style from './event-detail.module.scss';
import { useMemo } from 'react';
import { DeleteEventFeature, EditEventFeature } from '@/features/EventFeatures';

export const EventsDetails = () => {
	const viewableEvent = useStateSelector((s) => s.eventReducer.viewableEvent);
	const allCalendars = useStateSelector((s) => s.calendarReducer.allCalendars);
	const dispatch = useAppDispatch();
	const calendar = useMemo(() => {
		return allCalendars.find((c) => c.id === viewableEvent?.calendarId);
	}, [allCalendars, viewableEvent?.calendarId]);
	const isDetailShow = Boolean(viewableEvent);

	if (!viewableEvent) return null;

	return (
		<Modal
			onClose={() => {
				dispatch(setWatchedEvents(null));
			}}
			viewMode='fullScreen'
			title='Event information'
			isOpen={isDetailShow}
			editBtn={<EditEventFeature calendar={calendar!} event={viewableEvent} />}
			deleteBtn={<DeleteEventFeature event={viewableEvent} />}
		>
			<div className={style.inner}>
				<div className={style.titleInfo}>
					<Icon name='text-icon' />
					<h3>{viewableEvent.title}</h3>
				</div>
				<div className={style.dateInfo}>
					<Icon name='clock' />
					<p>
						{dayjs(viewableEvent.date).format('dddd, MMMM, D, ')}
						<span className={style.time}>
							{viewableEvent.time.start}
						</span> -{' '}
						<span className={style.time}>{viewableEvent.time.end}</span>{' '}
						{viewableEvent.isForAllDay && <span>For all day</span>}
					</p>
				</div>
				<div className={style.eventCalendar}>
					<Icon name='calendar' />
					<div className={style.calendar}>
						<span
							className={style.color}
							style={{
								backgroundColor: calendar?.color,
							}}
						/>
						<span>{calendar?.label}</span>
					</div>
				</div>
				<div className={style.description}>
					<Icon name='description' />
					<p>{viewableEvent.description}</p>
				</div>
			</div>
		</Modal>
	);
};
