import { useLocalStorage } from '@/shared/hooks';
import React, { ReactNode, createContext, useEffect } from 'react';

export interface IThemeContext {
	theme?: string;
	setTheme?: React.Dispatch<React.SetStateAction<string>>;
}

export const ThemeContext = createContext<IThemeContext>({
	theme: 'light',
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	// const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const [theme, setTheme] = useLocalStorage('theme') as IThemeContext;

	useEffect(() => {
		const root = document.querySelector(':root');
		if (theme === 'dark') root?.classList.add('dark');
		else root?.classList.remove('dark');
	});
	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
