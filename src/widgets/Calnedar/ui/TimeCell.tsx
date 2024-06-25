import { useStateSelector } from '@/app/store';
import { getTopForWrapperEvents, isEventExist, getEventsIntime } from '../libs';
import { memo, useMemo, useState } from 'react';
import { Event, eventByDate } from '@/entities/event';
import { Dayjs } from 'dayjs';
import { Modal } from '@/shared/ui-kit/Modal';
import { EventForm } from '@/features/EventFeatures/ui/EventForm/EventForm';
import style from './calendar.module.scss';

interface Props {
	date: Dayjs;
	indDate: number;
	timeOfCell: string;
	nextTimeOfCell: string;
	ind: number;
}

export const TimeCell = memo(
	({ date, indDate, timeOfCell, ind, nextTimeOfCell }: Props) => {
		const [isAddNewEvetFormOpen, setIsAddNewEvetFormOpen] = useState(false);
		const eventsInDay = useStateSelector((s) => eventByDate(s, date));

		const allCalendars = useStateSelector(
			(s) => s.calendarReducer.allCalendars
		);
      // console.log(nextTimeOfCell)
		const activeCalendars = useStateSelector(
			(s) => s.calendarReducer.selectedCalendars
		);

		const filteredEvents = useMemo(
			() =>
				eventsInDay.filter((event) =>
					activeCalendars.includes(event.calendarId)
				),
			[activeCalendars, eventsInDay]
		);
		return (
			<>
				<Modal
					nodeId='modalFullScreen'
					viewMode='fullScreen'
					title='Create event'
					isOpen={isAddNewEvetFormOpen}
					onClose={() => setIsAddNewEvetFormOpen(false)}
				>
					<EventForm
						calendar={allCalendars[0]}
						date={date}
						action='create'
						startTime={timeOfCell}
						endTime={nextTimeOfCell}
						setModalState={setIsAddNewEvetFormOpen}
					/>
				</Modal>
				<div
					onClick={() => {
                  // e.stopPropagation()
                  // console.log(e.currentTarget)
                  // console.log(e.target)
                  setIsAddNewEvetFormOpen(true)}}
					key={timeOfCell + date.toDate().toISOString()}
					className={style.timeCell}
					data-time={indDate === 0 && ind !== 0 ? timeOfCell : ''}
				>
					<div
						key={ind}
						className={style.eventsWrapper}
						style={{
							top: getTopForWrapperEvents(eventsInDay, timeOfCell) + 'px',
						}}
					>
						{filteredEvents.length
							? filteredEvents
									.filter((event) => isEventExist(event!, timeOfCell))
									.map((event) => {
										const calendar = allCalendars.find(
											(c) => c.id === event.calendarId
										);

										return (
											<Event
												relativeTop={getTopForWrapperEvents(
													eventsInDay,
													timeOfCell
												)}
												countEvents={
													getEventsIntime(eventsInDay, timeOfCell).length
												}
												id={event.id}
												color={calendar?.color as string}
												key={event.id}
												date={event.date}
												title={event.title}
												time={event.time}
												calendarId={event.calendarId}
												isForAllDay={event.isForAllDay}
												description={event.description}
											/>
										);
									})
							: null}
					</div>
				</div>
			</>
		);
	}
);
