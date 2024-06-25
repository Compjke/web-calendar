import { createFileRoute, redirect } from '@tanstack/react-router';

import { BaseLayout } from '../layout/baseLayout';

export const Route = createFileRoute('/')({
	beforeLoad: ({ context, location }) => {
		if (!context.authentication) {
			throw redirect({
				to: '/login',
				search: {
					redirect: location.pathname,
				},
			});
		}
	},
	loader: () =>
		new Promise((res) =>
			setTimeout(() => {
				res(1);
			}, 2000)
		),
	component: BaseLayout,

	pendingComponent: () => <div>Load page....</div>,
});
