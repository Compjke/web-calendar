import { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';
import '@/index.scss';
// import { expect, userEvent, within } from '@storybook/test';
const meta = {
	title: 'DatePicker',
	component: DatePicker,
	tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DatePickerDefault: Story = {
	args: {
		disableHighlightToday: false,
		canPickToday: false,
		pickTodayByDefault: true,
	},
};
