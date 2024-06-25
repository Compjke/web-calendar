import { useUser } from '../model';
import style from './user.module.scss';

export const User = () => {
	const { displayName, email } = useUser();

	if (!email) {
		return <span>{displayName}</span>;
	}
	return (
		<div className={style.user}>
			<span>{displayName}</span>

			{displayName === 'Hello, Guest!' ? null : (
				<span className={style.avatar}>{displayName[0].toUpperCase()}</span>
			)}
		</div>
	);
};
