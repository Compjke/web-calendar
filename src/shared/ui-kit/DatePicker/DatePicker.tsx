import { generateDate, months } from '@/shared/libs/calendar';
import { Icon } from '../Icon';
import {
	HTMLAttributes,
	MouseEventHandler,
	useLayoutEffect,
	useState,
} from 'react';

import { Dayjs } from 'dayjs';
import clsx from 'clsx';
import style from './date_picker.module.scss';

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

interface IDatePicker {
	disableHighlightToday?: boolean;
	canPickToday?: boolean;
	selectedDate: Dayjs;
	onDatePick: (date: Dayjs) => void;
	className?: string;
	onMouseLeave?: () => void;
}

export const DatePicker = ({
	disableHighlightToday = false,
	canPickToday = false,
	selectedDate,
	onDatePick,
	className,
	onMouseLeave,
}: IDatePicker) => {
	const [dateInDatePicker, setDateInDatePicker] = useState(selectedDate);

	useLayoutEffect(() => {
		setDateInDatePicker(selectedDate);
	}, [selectedDate]);

	const handleChangheMonth: MouseEventHandler<HTMLButtonElement> = (e) => {
		const action = e?.currentTarget?.attributes?.datatype.value;
		if (action === 'prev') {
			setDateInDatePicker(dateInDatePicker.month(dateInDatePicker.month() - 1));
		} else {
			setDateInDatePicker(dateInDatePicker.month(dateInDatePicker.month() + 1));
		}
	};
	return (
		<div
			onMouseLeave={onMouseLeave}
			data-testid='date-picker'
			className={clsx(style.container, className)}
		>
			<div className={style.panel}>
				<h3 className={style.yearAndMonth}>
					{months[dateInDatePicker.month()]} {dateInDatePicker.year()}
				</h3>
				<div className={style.panelActions}>
					<button
						type='button'
						onClick={handleChangheMonth}
						datatype='prev'
						className={style.panelBtn}
					>
						<Icon name='arrow-left' className={style.arrow} />
					</button>
					{canPickToday && (
						<button className={style.todayBtn} onClick={handleChangheMonth}>
							Today
						</button>
					)}
					<button
						type='button'
						onClick={handleChangheMonth}
						datatype='next'
						className={style.panelBtn}
					>
						<Icon name='arrow-right' className={style.arrow} />
					</button>
				</div>
			</div>
			<div className={style.days}>
				{DAYS.map((d, ind) => (
					<span key={ind}>{d}</span>
				))}
			</div>
			<div className={style.calendar}>
				{generateDate(dateInDatePicker.month(), dateInDatePicker.year()).map(
					({ date, currentMonth, today }, ind) => {
						return (
							<span
								data-testid='date'
								onClick={() => onDatePick(date)}
								key={ind}
								className={clsx(
									style.date,
									!currentMonth && style.illuminated,
									!disableHighlightToday && today && style.today,

									selectedDate?.toDate().toDateString() ===
										date.toDate().toDateString() && style.selected
								)}
							>
								{date.date()}
							</span>
						);
					}
				)}
			</div>
		</div>
	);
};
