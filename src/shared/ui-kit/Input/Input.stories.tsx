import { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
	title: 'Input',
	component: Input,
	tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InputDefaultTypeText: Story = {
	args: {
		required: true,
		id: 'user-name',
		labelText: 'UserName',
		placeholder: 'Type something....',
	},
};
export const InputDesabledTypeText: Story = {
	args: {
		required: true,
		disabled: true,
		id: 'user-name',
		labelText: 'UserName',
		placeholder: 'Type something....',
		value: 'Some value',
	},
};
export const InputWithErrorTypeText: Story = {
	args: {
		required: true,
		error: {
			message: 'Error text',
		},
		id: 'user-name',
		labelText: 'UserName',
		placeholder: 'Type something....',
		value: 'Some value',
	},
};
export const InputDefaultTypePassword: Story = {
	args: {
		required: true,
		id: 'user-name',
		type: 'password',
		labelText: 'Password',
		placeholder: 'Type something....',
	},
};
