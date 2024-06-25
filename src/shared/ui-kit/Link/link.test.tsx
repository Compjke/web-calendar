import { screen, render } from '@testing-library/react';

import { Link } from './Link';
import { vi } from 'vitest';
import { userEvent } from '@storybook/test';


describe('Link component', () => {
	const onCLick = vi.fn();
	it('should render link', async () => {
		render(<Link href='/test' label='Link' onClick={onCLick} />);
		const link = screen.getByRole('link');

		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', '/test');
		expect(link).toHaveTextContent('Link');

		await userEvent.click(link);

		expect(onCLick).toHaveBeenCalledTimes(1);
	});
});
