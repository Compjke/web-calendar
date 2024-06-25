export interface IUser {
	displayName: string | null;
	email?: string | null;
	accessToken?: string | null;
	isAuthenfication: boolean;
}

export interface IGuest {
	displayName: string;
}
