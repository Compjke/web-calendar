import { Logo } from '@/shared/ui-kit/Logo/Logo';
import style from './auth-form.module.scss';

import { SignInButton } from '@/features/signIn';
import { SignInAsGuest } from '@/features/signIn/ui/SignInAsGuest';

export const AuthForm = () => {
	return (
		<div className={style.form}>
			<Logo />
			<SignInButton />
			<SignInAsGuest />
		</div>
	);
};
