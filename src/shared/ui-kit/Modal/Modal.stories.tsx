import { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import '@/index.scss';
// import { expect, userEvent, within } from '@storybook/test';
const meta = {
	title: 'Modal',
	component: Modal,
	tags: ['autodocs'],
   // decorators : [
   //    Story => <div>Wrapper
   //       <div>
   //          <Story/>
   //       </div>
   //    </div>
   // !] не перезаписывает:(
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ModalOpen: Story = {
	args: {
		title: 'Title',
		children : <p >Test modal text</p>,
		isOpen: true,
		onClose: () => console.log('close'),
	},
};
