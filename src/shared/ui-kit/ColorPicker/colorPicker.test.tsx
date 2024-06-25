import { render, screen } from '@testing-library/react';
import { ColorPicker } from './ColorPicker';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('Color-picker component', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});
	const testOptins = ['color-1', 'color-2'];
	// const handleSelect = vi.fn().mockImplementation((str : string) => {

	// });
	const handleSelect = vi.fn();
	it('should correct render the color picker', () => {
		render(
			<ColorPicker
				colors={testOptins}
				data-testid='color-picker'
				onSelect={() => {}}
			/>
		);

		expect(screen.getByTestId('color-picker')).toBeInTheDocument();
	});
	it('should render options in color picker & pick color by user click', async () => {
		render(<ColorPicker colors={testOptins} onSelect={handleSelect} />);
		const buttons = screen.queryAllByRole('button');
		const defaultSelectedColor = screen.getByText(/no choisen/i);
		const selectedColor = screen.queryByText('color-1');
		expect(buttons.length).toEqual(testOptins.length);
		expect(selectedColor).toBeNull();
		expect(defaultSelectedColor).toBeInTheDocument();
		await userEvent.click(buttons[0]);
		screen.debug();
		expect(handleSelect).toHaveBeenCalled();
		expect(handleSelect).toHaveBeenCalledTimes(1);
		expect(handleSelect).toHaveBeenCalledWith('color-1');
		expect(screen.queryByText(testOptins[0])).toBeInTheDocument();
		expect(screen.queryByText('color-1')?.textContent).toEqual(testOptins[0]);
	});
});
