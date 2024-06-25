import { User } from '@/entities/user';
import { Signout } from '@/features/signOut';
import { useState } from 'react';
import { useUser } from '@/entities/user/model';
import { Button } from '@/shared/ui-kit/Button';
import { SignInButton } from '@/features/signIn';
import style from './header-layout.module.scss';
const Profile = () => {
	const user = useUser();
	const [isSignOutVisible, setIsSignOutVisible] = useState(false);
	return (
		<div
			className={style.profile}
			onClick={() => {
				setIsSignOutVisible(true);
			}}
		>
			<User />
			{/* {!user.email && <SignInButton text='Sign in' />} */}
			{isSignOutVisible && user.email && (
				<div className={style.signOutMenu}>
					<div className={style.top}>
						<span>{user.email}</span>
						<Button
							icon='close'
							className={style.closeBtn}
							onClick={(e) => {
								e?.stopPropagation();
								setIsSignOutVisible(false);
							}}
						/>
					</div>
					<Signout />
				</div>
			)}
		</div>
	);
};

export default Profile;
