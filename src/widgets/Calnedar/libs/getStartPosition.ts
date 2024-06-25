import { IEvent } from '@/entities/event/model/eventSlice';
import { isEventExist } from './isEventExist';

export function getTopForWrapperEvents(events: IEvent[], timeOfCell: string) {
	if (!events.length) return 0;
	const eventsInTime = getEventsIntime(events, timeOfCell);

	return Math.min(...eventsInTime);
}

export const getEventsIntime = (events: IEvent[], timeOfCell: string) =>
	events
		.filter((e) => isEventExist(e, timeOfCell))
		.map((events) => {
			return parseInt(events.time.start.split(':')[1]);
		});
