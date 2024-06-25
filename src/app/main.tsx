import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@/shared/theme';
import { ToastProvider } from '@/shared/ui-kit/Toast/ToastContext.tsx';

import './styles/index.scss';

import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store/root.ts';
import { App } from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider>
			<ToastProvider>
				<ReduxProvider store={store}>
					<App />
				</ReduxProvider>
			</ToastProvider>
		</ThemeProvider>
	</React.StrictMode>
);
