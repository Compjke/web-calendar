import React from 'react';
import type { Preview } from '@storybook/react';
import { ThemeContextProvider } from '../src/context/ThemeContext';
import { ToggleThemeSwitcher } from '../src/ui-kit/ToogleThemeSwitcher/index';
import '@/index.scss';
const preview: Preview = {
	decorators: [
		(Story, args) => (
			<ThemeContextProvider>
				<div
					style={{
						position: 'fixed',
						top: '10px',
						right: '10px',
						zIndex: 200,
					}}
				>
					<ToggleThemeSwitcher />
				</div>
				<Story />
			</ThemeContextProvider>
		),
	],
	globalTypes: {
		theme: {
			description: 'Global theme for component',
			defaultValue: 'light',
			toolbar: {
				title: 'Theme',
				icon: 'circlehollow',
				items: ['light', 'dark'],
				dynamicTitle: true,
			},
		},
	},
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},

		backgrounds: {
			default: 'light',
			values: [
				{
					name: 'dark',
					value: '#121212',
				},
				{
					name: 'light',
					value: '#fff',
				},
			],
		},
	},
};

export default preview;
