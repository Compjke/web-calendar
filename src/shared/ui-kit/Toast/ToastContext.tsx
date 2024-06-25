import dayjs from 'dayjs';
import { ReactNode, createContext, useMemo, useState } from 'react';
import { IToast, Toast, ToastType } from './Toast';
import styles from './toast.module.scss';
interface ToastContextValue {
	showToast: (message: string, type: ToastType) => void;
	hideToast: (id: number) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
	const [toast, setToast] = useState<IToast[]>([]);

	const showToast = (message: string, type: ToastType) => {
		const newToast = {
			id: Math.floor(Math.random() * dayjs().millisecond()),
			message,
			type,
			onClose: () => {},
		};
		setToast((prev) => [...prev, newToast]);
	};

	const hideToast = (id: number) => {
		setToast((prev) => prev.filter((item) => item.id !== id));
	};

	const contextValue = useMemo(
		() => ({
			showToast,
			hideToast,
		}),
		[]
	);

	return (
		<ToastContext.Provider value={contextValue}>
			<div className={styles.toasts}>
				{toast &&
					toast.map(({ message, id, type }) => (
						<Toast
							id={id}
							type={type}
							message={message}
							key={id}
							onClose={() => hideToast(id)}
						/>
					))}
			</div>
			{children}
		</ToastContext.Provider>
	);
};
