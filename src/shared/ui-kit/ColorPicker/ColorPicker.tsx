import { useState } from 'react';
import { colorsArr } from '@/shared/config';
import { Icon, IconName } from '../Icon/Icon';
import { ErrorOption } from 'react-hook-form';
import clsx from 'clsx';
import style from './color-picker.module.scss';

interface IColorPicker {
	colors: typeof colorsArr;
	title?: string;
	onSelect: (value: string) => void;
	icon?: IconName;
	seletedColor?: (typeof colorsArr)[number] | string;
	errors?: ErrorOption | undefined;
}

export const ColorPicker = ({
	colors,
	title = 'Colour',
	onSelect,
	icon,
	seletedColor,
	errors,
}: IColorPicker) => {
	const [selectedColor, setSelectedColor] = useState(seletedColor);

	const handleClick = (color: (typeof colorsArr)[number]) => {
		setSelectedColor(color);
		onSelect(color);
	};

	return (
		<div className={style.container} data-testid='color-picker'>
			{/* For test */}

			{/* <div
				style={{
					display: 'flex',
					gap: '5px',
					fontSize: '12px',
					alignItems: 'center',
					
				}}
			>
				Selected color{' '}
				{selectedColor ? (
					<span
						className={style.color}
						style={{ backgroundColor: selectedColor }}
					/>
				) : (
					'no choisen'
				)}
			</div> */}

			<div className={style.colorContainer}>
				{icon && <Icon style={{ marginTop: '15px' }} name={icon} />}
				<div>
					<h3 className={style.title}>{title}</h3>
					<div className={clsx(style.colors, errors && style.errorBorder)}>
						{colors.map((color) => (
							<div
								key={color}
								className={clsx(
									style.colorWrapper,
									selectedColor === color && style.selected
								)}
							>
								<button
									type='button'
									onClick={() => handleClick(color)}
									style={{ backgroundColor: color }}
									className={clsx(style.color)}
								></button>
							</div>
						))}
					</div>
					{errors && <span className={style.error}>{errors.message}</span>}
				</div>
			</div>
		</div>
	);
};
