import { Meta, StoryObj } from '@storybook/react';
import { CheckBox } from './CheckBox';
import '@/app/index.scss';
// import { expect, userEvent, within } from '@storybook/test';
const meta = {
	title: 'Checkbox',
	component: CheckBox,
	tags: ['autodocs'],
} satisfies Meta<typeof CheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CheckBoxWithLabelNotChecked: Story = {
	args: {
		label: 'Test label not cheked',
		defaultState: false,
	},
};
export const CheckBoxWithLabelChecked: Story = {
	args: {
		label: 'Test label cheked',

		defaultState: true,
	},

	// play: async ({ canvasElement }) => {
	// 	const canvas = within(canvasElement);
	// 	const checkbox = canvas.getByLabelText('Test label cheked');
	// 	await userEvent.click(checkbox);
	// 	await expect(checkbox).toBeChecked();
	// },
};
export const CheckBoxNoLabelChecked: Story = {
	args: {
		defaultState: true,
	},
};
export const CheckBoxNoLabelNotChecked: Story = {
	args: {
		defaultState: false,
	},
};
