import { HTMLAttributes, MouseEventHandler, ReactNode } from 'react';

import { Icon } from '../Icon';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import style from './modal.module.scss';

interface IModal extends HTMLAttributes<HTMLDivElement> {
	title: string;
	children: ReactNode;
	isOpen: boolean;
	viewMode: 'fullScreen' | 'small';
	onClose: () => void;
	className?: string;
	nodeId?: string;
	editBtn?: JSX.Element;
	deleteBtn?: JSX.Element;
}

export const Modal = ({
	children,
	title,
	isOpen = false,
	onClose,
	viewMode,
	nodeId = 'modalFullScreen',
	editBtn,
	deleteBtn,
	className,
	...props
}: IModal) => {
	if (!isOpen) return null;

	const onWrapperClick: MouseEventHandler<HTMLDivElement> = (e) => {
		const target = e.target;
		if (target.className === style.modalWrapperFullScreen || className) {
			onClose();
			return;
		}
	};

	const modal = (
		<div
			{...props}
			data-testid='modal'
			id='wrapper'
			className={style[viewMode]}
		>
			<div
				data-testid='backdrop'
				className={clsx(
					viewMode === 'fullScreen' ? style.modalWrapperFullScreen : className
				)}
				onClick={onWrapperClick}
			>
				<div className={style.modalContent}>
					<div className={style.modalTop}>
						<h3 className={style.modaltitle}>{title}</h3>
						<div className={style.actions}>
							{editBtn}
							{deleteBtn}
							<button
								className={style.modalCloseBtn}
								onClick={() => {
									onClose();
								}}
							>
								<Icon name='close' />
							</button>
						</div>
					</div>
					{children}
				</div>
			</div>
		</div>
	);

	return createPortal(modal, document.getElementById(nodeId)!);
};
