import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen.ts';
import { useAuth } from '@/entities/user';

const router = createRouter({
	routeTree,
	context: { authentication: undefined! },
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

export function App() {
	const isLoggedIn = useAuth();
	return <RouterProvider router={router} context={isLoggedIn} />;
}
