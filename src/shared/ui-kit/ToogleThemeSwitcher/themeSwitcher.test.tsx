import { screen, render, findByTestId } from '@testing-library/react';
import { ThemeContext } from '@/context/ThemeContext';
import { useContext } from 'react';
import { vi } from 'vitest';
import { userEvent } from '@storybook/test';
import { c } from 'node_modules/vite/dist/node/types.d-aGj9QkWt';

const TestSwitcher = () => {
	const { theme, setTheme } = useContext(ThemeContext);
	// let theme = 'lgiht';
	// const setTheme = () => {};
	const handleChangeTheme = () => {
		setTheme?.(theme === 'dark' ? 'light' : 'dark');
	};
	return (
		<div>
			<button onClick={handleChangeTheme}>Toggle</button>
			<p data-testid='current-theme'>{theme}</p>
		</div>
	);
};

describe('Theme provider component', () => {
	it('renders with the correct initial theme', () => {
		const { getByText } = render(
			<ThemeContext.Consumer>
				{({ theme }) => <p data-testid='current-theme'>{theme}</p>}
			</ThemeContext.Consumer>
		);

		expect(getByText(/light/i)).toBeInTheDocument();
	});
	it('toggles the theme when toggleTheme is called', async () => {
		const setTheme = vi.fn((theme) => {
			console.log(theme);
			// return theme === 'dark' ? 'light' : 'dark';
		});
		const { getByTestId, getByRole, findByTestId } = render(
			<ThemeContext.Provider value={{ theme: 'dark', setTheme }}>
				<TestSwitcher />
			</ThemeContext.Provider>
		);
		const button = getByRole('button');
		const currentTheme = getByTestId('current-theme');
		expect(button).toBeInTheDocument();
		expect(currentTheme).toHaveTextContent('dark');

		await userEvent.click(button);
		expect(setTheme).toHaveBeenCalled();

		// expect(await findByTestId('current-theme')).toHaveTextContent('light');

		// screen.debug();
	});
});
