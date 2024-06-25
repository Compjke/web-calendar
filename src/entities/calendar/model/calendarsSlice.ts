// import { RootStore } from '@/app/store';
import { colorsArr } from '@/shared/config';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
export interface ICalendar {
	label: string;
	color: (typeof colorsArr)[number] | string;
	isDefault: boolean;
	id: string;
}

interface CalendarsState {
	allCalendars: ICalendar[];
	selectedCalendars: string[];
}

const init: CalendarsState = {
	allCalendars: [
		{
			color: '#6c7ac4',
			label: 'Personal',
			isDefault: true,
			id: 'Deafult',
		},
		{
			color: '#439bdf',
			label: 'Calendar-2',
			isDefault: false,
			id: uuidv4(),
		},
	],
	selectedCalendars: ['Deafult'],
};

const calendarSlice = createSlice({
	name: 'calendar',
	initialState: init,
	reducers: {
		toggleSelectedCalendar: (
			state,
			action: PayloadAction<{
				calendarId: string;
				isCheked: boolean;
			}>
		) => {
			if (action.payload.isCheked) {
				state.selectedCalendars.push(action.payload.calendarId);
			} else {
				state.selectedCalendars = state.selectedCalendars.filter(
					(id) => id !== action.payload.calendarId
				);
			}
		},
		addNewCalendar: (state, action: PayloadAction<ICalendar>) => {
			state.allCalendars.push(action.payload);
			state.selectedCalendars.push(action.payload.id);
		},
		editCalendar: (
			state,
			action: PayloadAction<Omit<ICalendar, 'isDefault'>>
		) => {
			const { color, id, label } = action.payload;
			state.allCalendars.map((calendar) => {
				if (calendar.id === id) {
					(calendar.color = color), (calendar.label = label);
				}
				return calendar;
			});
		},
		deleteCalendar: (state, action: PayloadAction<string>) => {
			state.allCalendars = state.allCalendars.filter(
				(c) => c.id !== action.payload
			);
			state.selectedCalendars = state.selectedCalendars.filter(
				(id) => id !== action.payload
			);
		},
	},
});

export const {
	toggleSelectedCalendar,
	addNewCalendar,
	editCalendar,
	deleteCalendar,
} = calendarSlice.actions;

export default calendarSlice.reducer;
