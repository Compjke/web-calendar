import { useState } from 'react';
import style from './drop-down-menu.module.scss';
import clsx from 'clsx';
import { Icon } from '../Icon';

interface IDropDownMenu {
	// label : string;
	items: string[];
	isShown: boolean;
	defautlItem: 'Day' | 'Week';
	onChange: (i: 'Day' | 'Week') => void;
}

const testItems = ['Week', 'Day'];

export const DropDownMenu = ({
	isShown = false,
	items = testItems,
	defautlItem,
	onChange,
}: IDropDownMenu) => {
	const [isOpen, setIsOpen] = useState(isShown);
	const [selectedItem, setSelectedItem] = useState(defautlItem || items[0]);

	const handleChange = (i: 'Day' | 'Week') => {
		setSelectedItem(i);
		setIsOpen((prev) => !prev);
		onChange(i);
	};

	return (
		<div data-testid='drop-down' className={style.dropDownContainer}>
			<div
				className={clsx(style.dropDownInput, isOpen && style.active)}
				onClick={() => setIsOpen((prev) => !prev)}
			>
				<span>{selectedItem}</span>
				<button
					style={{ rotate: isOpen ? '180deg' : '' }}
					className={style.dropDownBtn}
				>
					<Icon name='drop-down-menu' />
				</button>
			</div>
			{isOpen && (
				<ul className={style.itemsList}>
					{items.map((i) => (
						<li
							onClick={() => handleChange(i as 'Day' | 'Week')}
							key={i}
							className={clsx(style.item, selectedItem === i && style.selected)}
						>
							{i}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
