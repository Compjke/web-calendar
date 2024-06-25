import { Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from './ColorPicker';
import '@/index.scss';
// import { expect, userEvent, within } from '@storybook/test';
const meta = {
	title: 'ColorPicker',
	component: ColorPicker,
	tags: ['autodocs'],
} satisfies Meta<typeof ColorPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ColorPickerDefault: Story = {
	args: {
		title: 'Color picker',
	},
};
