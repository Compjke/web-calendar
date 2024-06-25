import { Logo } from '@/shared/ui-kit/Logo/Logo';
import { ToggleThemeSwitcher } from '@/shared/ui-kit/ToogleThemeSwitcher';
import { HeaderDateSwitcher } from '@/features/HeaderDateSwitcher';
import Profile from './Profile';

import styles from './header-layout.module.scss';
import { ChangeViewModeFeture } from '@/features/ChangeViewModeFeture';

export default function HeaderLayout() {
	return (
		<header className={styles.root}>
			<div className={styles.inner}>
				<div className={styles.right}>
					<Logo />
					<HeaderDateSwitcher />
				</div>
				<div className={styles.left}>
					<ChangeViewModeFeture />
					<Profile />
					<ToggleThemeSwitcher />
				</div>
			</div>
		</header>
	);
}
