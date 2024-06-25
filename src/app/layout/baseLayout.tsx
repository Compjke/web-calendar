import { Layout } from '@/shared/ui-kit/Layout';
import { Calnedar } from '@/widgets/Calnedar';
import { HeaderLayout } from '@/widgets/HeaderLayout';
import { SideBar } from '@/widgets/SideBar';

export const BaseLayout = () => {
	return (
		<Layout
			headerSlot={<HeaderLayout />}
			sidebarSlot={<SideBar />}
			mainContentSlot={<Calnedar />}
		/>
	);
};
