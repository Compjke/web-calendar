import { Modal } from '@/shared/ui-kit/Modal';
import { EventForm } from './EventForm/EventForm';
import { useState } from 'react';
import { Button } from '@/shared/ui-kit/Button';

export const CreateEventFeature = () => {
	const [isModalOpen, setisModalOpen] = useState(false);
	return (
		<>
			<Modal
				nodeId='modalFullScreen'
				viewMode='fullScreen'
				title='Create event'
				isOpen={isModalOpen}
				onClose={() => setisModalOpen(false)}
			>
				<EventForm action='create' setModalState={setisModalOpen} />
			</Modal>

			<Button
				label='Create event'
				icon='plus'
				appereance='primary'
				style={{ width: '100%' }}
				onClick={() => setisModalOpen(true)}
			/>
		</>
	);
};
