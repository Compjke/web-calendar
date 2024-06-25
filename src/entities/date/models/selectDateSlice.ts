import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

interface SelectedDate {
	selectedDate: dayjs.Dayjs;
}

const init: SelectedDate = {
	selectedDate: dayjs(),
};

const selectedDateSlice = createSlice({
	name: 'selectedDate',
	initialState: init,
	reducers: {
		setSelectedDateInSmall: (state, action) => {
			state.selectedDate = action.payload;
		},
		changeDateInHeader: (
			state,
			action: PayloadAction<{
				action: 'prev' | 'next' | 'today';
				countDays: number;
			}>
		) => {
			if (action.payload.action === 'prev') {
				state.selectedDate = state.selectedDate.subtract(
					action.payload.countDays,
					'days'
				);
			} else if (action.payload.action === 'today') {
				state.selectedDate = dayjs();
			} else {
				state.selectedDate = state.selectedDate.add(
					action.payload.countDays,
					'days'
				);
			}
		},
	},
});

export const { setSelectedDateInSmall, changeDateInHeader } =
	selectedDateSlice.actions;

export default selectedDateSlice.reducer;
