import { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';
import '@/index.scss';
// import { expect, userEvent, within } from '@storybook/test';
const meta = {
	title: 'Toast',
	component: Toast,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div style={{ maxWidth: '200px', margin: 'auto' }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ToastInfo: Story = {
	args: {
		id: 123,
		message: 'Info toast',
	},
};
export const ToastSuccess: Story = {
	args: {
		id: 1232,
		type: 'success',
		message: 'Success toast',
	},
};
export const ToastError: Story = {
	args: {
		type: 'error',
		id: 1234,
		message: 'Error toast',
	},
};
