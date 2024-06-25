import { screen, render } from '@testing-library/react';

import { Modal } from './Modal';
import { vi } from 'vitest';
import { userEvent } from '@storybook/test';

describe('Modal component', () => {
	const onClose = vi.fn();

	it('should render the modal', () => {
		render(
			<Modal isOpen title='Test modal' onClose={() => {}}>
				Hello modal
			</Modal>
		);
		const modal = screen.getByTestId('modal');

		expect(modal).toBeInTheDocument();
	});
	it('should not render modal', () => {
		render(
			<Modal isOpen={false} title='Test modal' onClose={onClose}>
				Hello modal
			</Modal>
		);

		expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
	});

	it('should close modal after click on close button', async () => {
		const { getByTestId, getByRole, queryByTestId } = render(
			<Modal title='Title' isOpen children={'Hello modal'} onClose={onClose} />
		);

		expect(getByTestId('modal')).toBeInTheDocument();
		const closeBtn = getByRole('button');
		await userEvent.click(closeBtn);
		expect(onClose).toHaveBeenCalledTimes(1);
		expect(queryByTestId('modal')).not.toBeInTheDocument();
	});
	it('should close modal after click on backdrop', async () => {
		const { getByTestId, queryByTestId } = render(
			<Modal title='Title' isOpen children={'Hello modal'} onClose={onClose} />
		);

		expect(getByTestId('modal')).toBeInTheDocument();
		const backdrop = getByTestId('backdrop');
		await userEvent.click(backdrop);
		expect(onClose).toHaveBeenCalled();
		expect(queryByTestId('modal')).not.toBeInTheDocument();
	});
});
