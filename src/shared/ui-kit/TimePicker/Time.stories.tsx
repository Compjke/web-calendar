import { Meta, StoryObj } from '@storybook/react';
import { Select } from './TimePicker';

const meta = {
	title: 'Select',
	component: Select,
	tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SelectDefault: Story = {
	args: {
		label: 'Time',
		onSelect: () => {},
	},
};
export const SelectOpened: Story = {
	args: {
		label: 'Time',
		onSelect: () => {},
	},

	parameters: {
		pseudo: { hover: true },
	},
};
