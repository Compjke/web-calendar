import { RootStore } from '@/app/store';

import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import dayjs, { Dayjs } from 'dayjs';

export interface ITimeEvent {
	start: string;
	end: string;
}

export interface IEvent {
	id: string;
	title: string;
	date: Dayjs;
	time: ITimeEvent;
	isForAllDay: boolean;
	calendarId: string;
	description: string;
}

interface EventState {
	allEvents: IEvent[];
	viewableEvent: null | IEvent;
}

const init: EventState = {
	allEvents: [],
	viewableEvent: null,
};

const eventSlice = createSlice({
	name: 'event',
	initialState: init,
	reducers: {
		addNewEvent: (state, action: PayloadAction<IEvent>) => {
			state.allEvents.push(action.payload);
		},
		editEvent: (state, action: PayloadAction<IEvent>) => {
			state.allEvents = state.allEvents.map((event) => {
				if (event.id === action.payload.id) {
					event = action.payload;
				}
				return event;
			});
		},
		deleteEventById: (state, action: PayloadAction<string>) => {
			state.allEvents = state.allEvents.filter((e) => e.id !== action.payload);
			state.viewableEvent = null;
		},

		deleteEventsByCalendarId: (state, action: PayloadAction<string>) => {
			state.allEvents = state.allEvents.filter(
				(e) => e.calendarId !== action.payload
			);
		},
		setWatchedEvents: (state, action: PayloadAction<IEvent | null>) => {
			state.viewableEvent = action.payload;
		},
	},
});

export const {
	addNewEvent,
	deleteEventsByCalendarId,
	editEvent,
	setWatchedEvents,
	deleteEventById
} = eventSlice.actions;

export const eventByDate = createSelector(
	[(state: RootStore) => state.eventReducer, (_, date: Dayjs) => date],

	(events, date) => {
		// console.log('memoized selector ran');
		// console.log(events);
		return events.allEvents.filter(
			(event) =>
				dayjs(event.date).toDate().toDateString() ===
				date.toDate().toDateString()
		);
	}
);
// export const eventsByCalendar = createSelector(
// 	[
// 		(state: RootStore) => state.calendarReducer.allCalendars,
// 		(state: RootStore) => state.eventReducer,
// 	],

// 	(calendars, events) => {
// 		const calendarsIds = calendars.map((c) => c.id);
// 		const eventsInCalendar = events.filter(e => e.id );
// 		return calendarsIds;
// 	}
// );

export default eventSlice.reducer;
