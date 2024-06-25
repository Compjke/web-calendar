import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ViewMode {
	viewMode: 'Day' | 'Week';
}

const init: ViewMode = {
	viewMode: 'Week',
};

const viewModeSlice = createSlice({
	name: 'view-mode',
	initialState: init,
	reducers: {
		changeViewMode: (state, action: PayloadAction<ViewMode['viewMode']>) => {
			state.viewMode = action.payload;
		},
	},
});

export const { changeViewMode } = viewModeSlice.actions;

export default viewModeSlice.reducer;
