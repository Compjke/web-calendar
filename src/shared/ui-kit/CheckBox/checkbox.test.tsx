import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CheckBox } from './CheckBox';

describe('Checkbox component ', () => {
	it('should be correct render in document', () => {
		render(<CheckBox />);
		const checkBox = screen.getByRole('checkbox');
		expect(checkBox).toBeInTheDocument();
	});
	it('should be render with empty checkbox when props defaultCheket is false', () => {
		render(<CheckBox />);
		const emptyCheckBox = screen.getByTestId('empty');
		expect(emptyCheckBox).toBeInTheDocument();
	});
	it('should be render with filled checkbox when props defaultCheket is true', () => {
		render(<CheckBox defaultState={true} />);
		const filledCheckBox = screen.getByTestId('filled');
		expect(filledCheckBox).toBeInTheDocument();
	});
	it('should be checked when click on empty chekbox', async () => {
		const { getByRole } = render(<CheckBox />);
		const checkBox = getByRole('checkbox');
		await userEvent.click(checkBox);

		expect(checkBox).toBeChecked();
	});
});
