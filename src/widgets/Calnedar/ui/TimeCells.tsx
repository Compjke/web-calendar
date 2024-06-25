import { getTimesArr } from '@/shared/libs';
import { Dayjs } from 'dayjs';

import { TimeCell } from './TimeCell';


import style from './calendar.module.scss';

interface TimeCelLs {
	date: Dayjs;
	indDate: number;
}

export const TimeCells = ({ date, indDate }: TimeCelLs) => {
	return (
		<div className={style.timeCols}>
			{getTimesArr(60, 24).map((timeOfCell, ind , arrTime) => (
				<TimeCell
					date={date}
					key={timeOfCell}
					timeOfCell={timeOfCell}
					nextTimeOfCell = {arrTime[ind + 1]}
					ind={ind}
					indDate={indDate}
				/>
			))}
		</div>
	);
};
