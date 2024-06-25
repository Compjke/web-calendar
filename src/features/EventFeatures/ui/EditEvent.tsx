import { Modal } from '@/shared/ui-kit/Modal';
import { EventForm } from './EventForm/EventForm';
import { useState } from 'react';
import { Button } from '@/shared/ui-kit/Button';

import { IEvent } from '@/entities/event/model/eventSlice';

import { ICalendar } from '@/entities/calendar';
import styles from './event-features.module.scss';
// interface Props {
// 	setisModalOpen: Dispatch<SetStateAction<boolean>>;
// 	isModalOpen: boolean;
// }

interface Props {
	event: IEvent;
	calendar: ICalendar;
}

export const EditEventFeature = ({ event, calendar }: Props) => {
	const [isModalOpen, setisModalOpen] = useState(false);
	// const dispatch = useAppDispatch();

	return (
		<>
			<Modal
				nodeId='modalFullScreen'
				viewMode='fullScreen'
				title='Edit event'
				isOpen={isModalOpen}
				onClose={() => setisModalOpen(false)}
			>
				<EventForm
					id={event.id}
					calendar={calendar}
					title={event.title}
					startTime={event.time.start}
					endTime={event.time.end}
					date={event.date}
					description={event.description}
					isForAllDay={event.isForAllDay}
					action='edit'
					setModalState={setisModalOpen}
				/>
			</Modal>

			<Button
				onClick={() => {
					setisModalOpen(true);
				}}
            className={styles.editBtn}
				
				icon='edit'
				appereance='secondary'
			/>
		</>
	);
};
