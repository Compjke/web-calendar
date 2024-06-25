import { AuthForm } from '@/widgets/AuthForm';
import style from './welcome-page.module.scss';

export const LoginPage = () => {

	return (
		<div className={style.page}>
			<AuthForm />
		</div>
	);
};
