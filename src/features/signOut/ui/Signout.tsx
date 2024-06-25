import { Button } from '@/shared/ui-kit/Button';
import { signOut } from 'firebase/auth';
import { auth } from '@/shared/libs';
import { useAppDispatch } from '@/app/store';
import { resetUser } from '@/entities/user';
import style from './sign-out-btn.module.scss';

export const Signout = () => {
	const dispath = useAppDispatch();
	const handleCLick = () => {
		signOut(auth).then(() => {
			dispath(resetUser());
		});
	};
	return (
		<Button
			label='Logout'
			icon='sign-out'
			appereance='secondary'
			className={style.btn}
			onClick={handleCLick}
		/>
	);
};
