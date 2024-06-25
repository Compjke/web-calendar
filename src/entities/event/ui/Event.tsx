import { useAppDispatch } from '@/app/store';
import { calcStyles } from '../libs/calculateStyles';
import { IEvent, setWatchedEvents } from '../model/eventSlice';
import { MouseEventHandler } from 'react';
import style from './events.module.scss';

interface Props {
	relativeTop: number;
	countEvents: number;
	color: string;
	// onClick: () => void;
}

export const Event = ({
	color,
	isForAllDay,
	time,
	date,
	title,
	relativeTop,
	countEvents,
	calendarId,
	description,
	id,
	// onClick,
}: IEvent & Props) => {
	const dispatch = useAppDispatch();
	const handleClick: MouseEventHandler = (e) => {
		e.stopPropagation();
		dispatch(
			setWatchedEvents({
				id,
				calendarId,
				date,
				description,
				isForAllDay,
				time,
				title,
			})
		);
	};

	const { top, height, bgColor, maxWidth } = calcStyles(
		time.start,
		time.end,
		color,
		relativeTop,
		countEvents
	);

	return (
		<>
			<div
				onClick={handleClick}
				className={style.event}
				style={{
					backgroundColor: bgColor,
					height,
					borderLeft: `4px solid ${color}`,
					top,
					width: maxWidth,
				}}
			>
				<h4 className={style.title}>{title}</h4>
				<div className={style.time}>
					{time?.start} - {time?.end}
				</div>
			</div>
		</>
	);
};
