import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
// afterEach(cleanup);

describe('Button component', () => {
	const consoleMock = vi.spyOn(console, 'log');
	// .mockImplementation(() => undefined);

	afterEach(() => {
		consoleMock.mockClear();
	});

	it('should render Button component correctly', () => {
		render(
			<Button
				onClick={() => console.log('Click')}
				appereance='primary'
				label='Button'
			/>
		);
		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
	});

	it('should show some message in console on click', async () => {
		render(
			<Button
				onClick={() => console.log('Click')}
				appereance='primary'
				label='Button'
			/>
		);
		const button = screen.getByRole('button');
		await userEvent.click(button);
		expect(consoleMock).toHaveBeenCalled();
		expect(consoleMock).toHaveBeenCalledTimes(1);
		expect(consoleMock).toHaveBeenCalledWith('Click');
	});

	it('should render correct icon in button when it came in props', () => {
		render(
			<Button appereance='secondary' label='Button with icon' icon='play' />
		);
		const button = screen.getByRole('button');
		const svg = button.querySelector('svg');
		expect(svg).toBeInTheDocument();
		// screen.debug()
	});
	it('should add right class depens on appereance props', () => {
		render(
			<Button appereance='secondary' label='Button with icon' icon='play' />
		);
		const button = screen.getByRole('button');
		const isClassExist = [...button.classList].some((cl) =>
			cl.match(/secondary/gi)
		);

		expect(isClassExist).toBeTruthy();
	});
	it('should add right label text from props', () => {
		render(<Button appereance='secondary' label='Test label' />);
		const button = screen.getByRole('button');
		expect(button).toHaveTextContent('Test label');
	});
});
