import { screen, render } from '@testing-library/react';
import { DropDownMenu } from './DropDownMenu';
import userEvent from '@testing-library/user-event';

const testItems = ['item-1', 'item-2'];

describe('Dropdown component', () => {
	it('should render the dropdown component & not show list items', () => {
		const { getByTestId, queryByRole } = render(
			<DropDownMenu isShown={false} items={testItems} />
		);
		expect(getByTestId('drop-down')).toBeInTheDocument();
		expect(queryByRole('list')).not.toBeInTheDocument();
	});
	it('should render item of drop down menu when click button', async () => {
		const { getByRole } = render(
			<DropDownMenu isShown={false} items={testItems} />
		);
		const button = getByRole('button');

		await userEvent.click(button);
		// screen.debug();
		expect(getByRole('list')).toBeInTheDocument();
		expect(screen.getAllByRole('listitem').length).toEqual(testItems.length);
	});
});
