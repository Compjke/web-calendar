import { Modal } from '@/shared/ui-kit/Modal';
import { useState } from 'react';
import { Button } from '@/shared/ui-kit/Button';

import { useAppDispatch } from '@/app/store';

import { useToast } from '@/shared/ui-kit/Toast';
import { IEvent, deleteEventById } from '@/entities/event/model/eventSlice';
import style from './event-features.module.scss';

interface Props {
	event: IEvent;
}

export const DeleteEventFeature = ({ event }: Props) => {
	const [isModalOpen, setisModalOpen] = useState(false);
	const dispatch = useAppDispatch();
	const toast = useToast();

	const handleDelete = () => {
		dispatch(deleteEventById(event.id));
		toast?.showToast(`Event ${event.title} was deleted`, 'info');
	};

	return (
		<>
			<Modal
				nodeId='modalFullScreen'
				viewMode='fullScreen'
				title='Delete event'
				isOpen={isModalOpen}
				onClose={() => setisModalOpen(false)}
			>
				<div className={style.deleteModalContent}>
					<p className={style.deleteMsg}>
						Are you sure you want to delete Event{' '}
						<span style={{ fontWeight: 700, display: 'inline-block' }}>
							{event.title}
						</span>
						? You'll no longer have access to it.
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
};
