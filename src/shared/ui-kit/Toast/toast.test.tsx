import { screen, render } from '@testing-library/react';

import { ToastProvider } from './ToastContext';
import { Toast } from './Toast';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { useToast } from './useToast';
import { ReactNode, act } from 'react';

const onClose = vi.fn();

const TestToastComponent = () => {
	const toast = useToast();

	return (
		<div data-testid='toasts'>
			{toast?.showToast('Info toast', 'info') as ReactNode}
			{toast?.showToast('Success toast', 'success') as ReactNode}
			{toast?.showToast('Error toast', 'error') as ReactNode}
		</div>
	);
};

const wait5sec = (func: () => void) => {
	setTimeout(func, 5000);
};

const mock = vi.fn(() => console.log('executed'));

describe('Toast component', () => {
	it('renders without crashing', () => {
		render(<Toast id={1} message='Message' onClose={() => {}} />);
		expect(screen.queryByText(/message/i)).toBeInTheDocument();
	});
	it('should render correct toast depend on type', () => {
		const { getByTestId } = render(
			<Toast id={2} type='success' message='Message' onClose={() => {}} />
		);
		expect(getByTestId('toast')).toHaveClass('success');
	});
	it('should clsoe toast after click close button', async () => {
		const { getByRole } = render(
			<Toast id={2} type='success' message='Message' onClose={onClose} />
		);
		const btn = getByRole('button');

		await userEvent.click(btn);
		expect(onClose).toHaveBeenCalled();
		// expect(queryByTestId('toast')).toBeNull();
	});
});

describe('Toast conext component', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});
	afterEach(() => {
		vi.restoreAllMocks();
	});
	it('provides expected ToastCOntext obj to child elements', async () => {
		const { queryByText } = render(
			<ToastProvider>
				<TestToastComponent />
			</ToastProvider>
		);
		expect(useToast).toBeDefined();
		const infoToast = queryByText(/Info/i);
		const successToast = queryByText(/Success/i);
		const erorrToast = queryByText(/Error/i);

		expect(infoToast).toHaveTextContent('Info toast');
		expect(infoToast?.parentElement).toHaveClass('info');
		expect(successToast).toHaveTextContent('Success toast');
		expect(successToast?.parentElement).toHaveClass('success');
		expect(erorrToast).toHaveTextContent('Error toast');
		expect(erorrToast?.parentElement).toHaveClass('error');

		wait5sec(mock);
		act(() => {
			vi.runAllTimers();
		});
		expect(mock).toHaveBeenCalledTimes(1);
		expect(infoToast).not.toBeInTheDocument();
		expect(successToast).not.toBeInTheDocument();
		expect(erorrToast).not.toBeInTheDocument();
		vi.useRealTimers();
	});
});
