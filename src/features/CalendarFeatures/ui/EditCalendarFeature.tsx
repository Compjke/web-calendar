import { Modal } from '@/shared/ui-kit/Modal';
import { CalendarForm } from './CalendarForm/CalendarForm';
import { useState } from 'react';
import { Button } from '@/shared/ui-kit/Button';
import { ICalendar } from '@/entities/calendar';
import style from './calendar-feature.module.scss';

interface Props {
	calendar: ICalendar;
}

export default function EditCalendarFeature({ calendar  }: Props) {
	const [isModalOpen, setisModalOpen] = useState(false);

	return (
		<>
			<Modal
				nodeId='modalCalendars'
				viewMode='small'
				title='Edit calendar'
				isOpen={isModalOpen}
				onClose={() => setisModalOpen(false)}
			>
				<CalendarForm
					title={calendar.label}
					calendarId={calendar.id}
					color={calendar.color}
					action='edit'
					onModalCLose={() => setisModalOpen(false)}
				/>
			</Modal>

			<Button
				icon='edit'
				appereance='secondary'
				className={style.editBtn}
				onClick={() => setisModalOpen(true)}
			/>
		</>
	);
}
