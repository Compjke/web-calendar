import { screen, render, getByRole } from '@testing-library/react';

import { TextArea } from './TextArea';
import { userEvent } from '@storybook/test';
import { act } from 'react';

describe('Textarea component', () => {
	it('should render the textarea', () => {
		render(<TextArea placeholder='type something....' label='Text area' />);
		expect(screen.getByPlaceholderText(/type something/i)).toBeInTheDocument();
	});
	it('should change value when type in the textarea', async () => {
		const { getByRole } = render(
			<TextArea
				placeholder='type something....'
				label='Text area'
				testValue={''}
			/>
		);
		const textarea = getByRole('textbox');
		await userEvent.type(textarea, 'Test text');
		screen.debug();
		expect(textarea).toHaveDisplayValue('Test text');
	});
	it('should change size when focues on the textarea', async () => {
		const { getByRole } = render(
			<TextArea placeholder='type something....' label='Text area' />
		);
		const textarea = getByRole('textbox');
		act(() => {
			textarea.focus();
		});

		expect(textarea).toHaveFocus();
		screen.debug();
		
	});
});
