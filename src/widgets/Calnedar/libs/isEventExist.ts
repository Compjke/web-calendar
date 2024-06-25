import { IEvent } from '@/entities/event/model/eventSlice';

export const isEventExist = (event: IEvent, time_2: string): boolean => {
	// let counter = 0;
	const t1 = event.time.start.split(':')[0];
	const t2 = time_2.split(':')[0];
	
	return t1 === t2;
};

