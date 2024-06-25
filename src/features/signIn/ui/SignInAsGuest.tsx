import { useAppDispatch } from '@/app/store';
import { Button } from '@/shared/ui-kit/Button';
import { setUserAsGuest } from '@/entities/user/model/userSlice';

export const SignInAsGuest = () => {
	const dispatch = useAppDispatch();
	const handleClick = () => {
		dispatch(setUserAsGuest('Hello, Guest!'));
	};

	return (
		<Button
			onClick={handleClick}
			appereance='secondary'
			label='Сontinue as a guest'
		/>
	);
};
