import { AnchorHTMLAttributes, MouseEventHandler } from 'react';
import style from './link.module.scss';
import clsx from 'clsx';

interface ILink extends AnchorHTMLAttributes<HTMLAnchorElement> {
	label: string;
	href: string;
	className?: string;
	disabled?: boolean;
	onClick: (e: unknown) => void;
}

export const Link = ({
	href,
	label,
	className,
	disabled = false,
	onClick,
	...props
}: ILink) => {
	const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
		console.log('click');
		onClick && onClick(e);
	};
	return (
		<a
			onClick={handleClick}
			className={clsx(className, style.link, disabled && style.disabled)}
			href={href}
			{...props}
		>
			{label}
		</a>
	);
};
