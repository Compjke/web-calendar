import { screen, render } from '@testing-library/react';
import { Input } from './Input';
import userEvent from '@testing-library/user-event';

describe('Input component', () => {
	it('should render input component', () => {
		render(<Input id='test' labelText='Test label' />);
		expect(screen.getByText(/test label/i)).toBeInTheDocument();
	});
	it('should render password input with icon & change icon on click icon', async () => {
		const { getByRole, getByTestId, queryByTestId } = render(
			<Input id='password' type='password' labelText='Password' />
		);
		expect(getByTestId('show-password')).toBeInTheDocument();

		await userEvent.click(getByTestId('show-password'));

		expect(queryByTestId('show-password')).not.toBeInTheDocument();
		const input = getByRole('textbox');
		expect(input).toHaveAttribute('type', 'text');
		expect(getByTestId('hide-password')).toBeInTheDocument();
	});
	it('should render error message', () => {
		const { getByText, getByRole } = render(
			<Input
				id='input-with-error'
				labelText='Field with error'
				error={{ message: 'test error' }}
			/>
		);

		expect(getByRole('textbox')).toHaveClass('errorBorder', { exact: false });
		expect(getByText(/test error/i)).toBeInTheDocument();
      screen.debug()
		expect(getByText(/test error/i)).toHaveClass('error');
	});

   
});
