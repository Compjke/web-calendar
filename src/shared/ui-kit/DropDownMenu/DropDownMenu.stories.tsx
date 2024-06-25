import { Meta, StoryObj } from '@storybook/react';
import { DropDownMenu } from './DropDownMenu';
import '@/index.scss';
// import { expect, userEvent, within } from '@storybook/test';
const meta = {
	title: 'DropDownMenu',
	component: DropDownMenu,
	tags: ['autodocs'],
} satisfies Meta<typeof DropDownMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DropDownMenuClosed: Story = {
   args : {
      isShown : false,
      items : [
         'item 1',
         'item 2',
         'item 3',
      ]
   }
};
export const DropDownMenuOpened: Story = {
   args : {
      isShown : true,
      items : [
         'item 1',
         'item 2',
         'item 3',
      ]
   }
};
