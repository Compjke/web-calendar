import style from './Button.module.scss';
import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

import { Icon } from '../Icon';

import { IconName } from '../Icon/Icon';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	label?: string;
	appereance?: 'primary' | 'secondary';
	onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;

	disabled?: boolean;
	bgColor?: string;
	icon?: IconName;
	className?: string;
}

export const Button = ({
	appereance,
	label,
	disabled = false,
	onClick,
	bgColor,
	icon,
	className,
	...props
}: IProps) => {
	return (
		<button
			style={{ backgroundColor: bgColor }}
			disabled={disabled}
			onClick={onClick}
			className={clsx(style.button, style[appereance!], className)}
			{...props}
		>
			{icon && <Icon role='icon' name={icon} />}
			{label}
		</button>
	);
};
