import { useAppDispatch, useStateSelector } from '@/app/store';
import { changeDateInHeader, useDate } from '@/entities/date';
import { Button } from '@/shared/ui-kit/Button';
import style from './change-date-header.module.scss';

export default function HeaderDateSwitcher() {
	const { selectedDate } = useDate();
	const viewMode = useStateSelector((s) => s.viweModeReducer.viewMode);
	const formatOfDate = viewMode === 'Week' ? 'MMMM YYYY' : 'MMMM DD, YYYY';
	const countDays = viewMode === 'Week' ? 7 : 1;
	const dispatch = useAppDispatch();
	const handleChangeDate = (action: 'prev' | 'next' | 'today') => {
		dispatch(changeDateInHeader({ action, countDays }));
	};

	return (
		<div className={style.root}>
			<Button
				appereance='primary'
				label='Today'
				onClick={() => handleChangeDate('today')}
			/>
			<div className={style.actions}>
				<Button
					className={style.btn}
					icon='arrow-left'
					onClick={() => handleChangeDate('prev')}
				/>
				<Button
					className={style.btn}
					icon='arrow-right'
					onClick={() => handleChangeDate('next')}
				/>
			</div>
			<span className={style.date}>{selectedDate.format(formatOfDate)}</span>
		</div>
	);
}
