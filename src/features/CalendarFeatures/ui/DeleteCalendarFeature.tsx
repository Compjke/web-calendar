import { Modal } from '@/shared/ui-kit/Modal';
import { useState } from 'react';
import { Button } from '@/shared/ui-kit/Button';

import style from './calendar-feature.module.scss';
import { ICalendar, deleteCalendar } from '@/entities/calendar';
import { useAppDispatch } from '@/app/store';
import { deleteEventsByCalendarId } from '@/entities/event';
import { useToast } from '@/shared/ui-kit/Toast';

interface Props {
	calendar: ICalendar;
}

export default function DeleteCalendarFeature({ calendar }: Props) {
	const [isModalOpen, setisModalOpen] = useState(false);
	const dispatch = useAppDispatch();
	const toast = useToast();

	const handleDelete = () => {
		dispatch(deleteCalendar(calendar.id));
		dispatch(deleteEventsByCalendarId(calendar.id));

		toast?.showToast(`Calendar ${calendar.label} was deleted`, 'info');
	};

	return (
		<>
			<Modal
				nodeId='modalFullScreen'
				viewMode='fullScreen'
				title='Delete calendar'
				isOpen={isModalOpen}
				onClose={() => setisModalOpen(false)}
			>
				<div className={style.deleteModalContent}>
					<p className={style.deleteMsg}>
						Are you sure you want to delete{' '}
						<span style={{ fontWeight: 700, display: 'inline-block' }}>
							{calendar.label}
						</span>
						? You'll no longer have access to this calendar and its events.
					</p>
					<div className={style.deleteActions}>
						<Button
							style={{ minWidth: '80px' }}
							appereance='secondary'
							label='Cancel'
							onClick={() => setisModalOpen(false)}
						/>
						<Button
							style={{ minWidth: '80px' }}
							appereance='primary'
							label='Delete'
							onClick={handleDelete}
						/>
					</div>
				</div>
			</Modal>

			<Button
				icon='delete'
				appereance='secondary'
				className={style.deleteBtn}
				onClick={() => setisModalOpen(true)}
			/>
		</>
	);
}
