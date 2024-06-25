import { ICalendar } from '@/entities/calendar';
import { Dayjs } from 'dayjs';
import { colorsArr } from './constans';

export interface IFormCreateEventValues {
	title: string;
	description: string;
	date: Dayjs;
	startTime: string;
	endTime: string;
	isForAllDay?: boolean;
	calendar: ICalendar;
}
export interface IFormCreateCalendarValues {
	title: string;
	color: (typeof colorsArr)[number] | string;
}
