import style from './Logo.module.scss';

export const Logo = ({
	className,
	label = 'WebCalendar',
}: {
	className?: string;
	label?: string;
}) => {
	return (
		<div className={style.logo}>
			<svg
				className={className}
				width='103'
				height='80'
				viewBox='0 0 103 80'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<rect
					x='22.6274'
					y='40'
					width='56.5685'
					height='56.5685'
					rx='10.4497'
					transform='rotate(-45 22.6274 40)'
					fill='#80D78D'
				/>
				<rect
					y='40'
					width='56.5685'
					height='56.5685'
					rx='10.4497'
					transform='rotate(-45 0 40)'
					fill='#00AE1C'
				/>
			</svg>
			<span className={style.logoLabel}>{label}</span>
		</div>
	);
};
