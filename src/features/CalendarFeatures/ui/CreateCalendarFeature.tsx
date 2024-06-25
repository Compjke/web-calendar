import { Modal } from '@/shared/ui-kit/Modal';
import { CalendarForm } from './CalendarForm/CalendarForm';
import { useState } from 'react';
import { Button } from '@/shared/ui-kit/Button';
import style from './calendar-feature.module.scss';

export default function CreateCalendarFiature() {
	const [isModalOpen, setisModalOpen] = useState(false);

	return (
		<>
			<Modal
				nodeId='modalCalendars'
				viewMode='small'
				title='Create calendar'
				isOpen={isModalOpen}
				onClose={() => setisModalOpen(false)}
			>
				<CalendarForm
					action='create'
					onModalCLose={() => setisModalOpen(false)}
				/>
			</Modal>

			<Button
				icon='plus'
				appereance='secondary'
				className={style.plusBtn}
				onClick={() => setisModalOpen(true)}
			/>
		</>
	);
}
