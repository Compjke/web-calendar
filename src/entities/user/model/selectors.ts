import { useStateSelector } from '@/app/store';

export const useAuth = () => {
	const isAuthenfication = useStateSelector(
		(s) => s.userReducer.isAuthenfication
	);
	return { authentication: isAuthenfication };
};

export type Auth = ReturnType<typeof useAuth>;

export const useUser = () => {
	return useStateSelector((s) => s.userReducer);
};
