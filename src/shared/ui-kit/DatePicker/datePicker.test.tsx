import { screen, render } from '@testing-library/react';
import { DatePicker } from './DatePicker';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { months } from '@/shared/libs/calendar';
describe('Date picker component', () => {
	// const handleClick = vi.fn();
	it('should render the date picker component', () => {
		const { getByTestId } = render(<DatePicker />);
		expect(getByTestId('date-picker')).toBeInTheDocument();
	});
	it('should render 42 dates', () => {
		const { getAllByTestId } = render(<DatePicker />);
		expect(getAllByTestId('date').length).toEqual(42);
	});
	it('should have buttom for pick current date if we gave it in the porps', async () => {
		const { getByText } = render(<DatePicker canPickToday />);
		const today = new Date().getDate();
		const todayBtn = getByText(/Today/i);
		expect(todayBtn).toBeInTheDocument();

		await userEvent.click(todayBtn);
		const todayEl = screen.queryByText(today);
		expect(today.toString()).toEqual(todayEl?.textContent);
	});
	it('should render correct month and year  & when click buttons it will be change', async () => {
		const { getAllByRole, getByRole } = render(<DatePicker />);
		const data = getByRole('heading');
		const [month, year] = data.textContent.split(' ');
		const curMonth = new Date().getMonth();
		expect(month).toEqual(months[curMonth]);
		expect(year).toEqual(new Date().getFullYear().toString());
		const [prev, next] = getAllByRole('button');

		await userEvent.click(prev);
		const [prevMonth] = data.textContent.split(' ');
		expect(prevMonth).toEqual('April');
		await userEvent.click(next);
		const [nextMonth] = data.textContent.split(' ');
		expect(nextMonth).toEqual(months[curMonth]);
	});
});
