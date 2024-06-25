import { ThemeContext } from '@/shared/theme';
import { useContext } from 'react';
import styles from './toggleThemeSwitche.module.scss';

export const ToggleThemeSwitcher = () => {
	const { theme, setTheme } = useContext(ThemeContext);
	const handleChangeTheme = () => {
		setTheme?.(theme === 'dark' ? 'light' : 'dark');
	};
	return (
		<div className={styles.toggleContainer}>
			<input
				type='checkbox'
				id='toggleTheme'
				onChange={handleChangeTheme}
				className={styles.toggle}
			/>
			<label htmlFor='toggleTheme'>{theme}</label>
		</div>
	);
};
