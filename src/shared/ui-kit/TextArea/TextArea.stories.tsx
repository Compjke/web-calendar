import { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

const meta = {
	title: 'TextArea',
	component: TextArea,
	tags: ['autodocs'],
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextAreaDefault: Story = {
	args: {
		label : 'Description',
	},
};
