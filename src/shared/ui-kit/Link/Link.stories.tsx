import { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';
import { userEvent, within } from '@storybook/test';

const meta = {
	title: 'Link',
	component: Link,
	tags: ['autodocs'],
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LinkDefault: Story = {
	args: {
		href: ' #',
		label: 'Default Link',
		onClick: () => {},
	},
};
export const LinkDisabled: Story = {
	args: {
		href: ' #',
		label: 'Disabled Link',
		onClick: () => {},
		disabled: true,
	},
};
export const LinkHovered: Story = {
	args: {
		href: ' #',
		label: 'Link Hovered',
		onClick: () => {},
	},

	parameters: {
		pseudo: { hover: true },
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const link = canvas.getByText('Link Hovered');

		await userEvent.hover(link);
	},
};


export const LinkActive: Story = {
	args: {
		href: ' #',
		label: 'Active Link',
		onClick: () => {},
	},
   parameters : {
      pseudo: { active: true },
   }
};