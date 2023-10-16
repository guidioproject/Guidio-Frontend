import { configureStore } from '@reduxjs/toolkit';
import guideSlice from './slices/guideSlice';
import uiSlice from './slices/uiSlice';
import userSlice from './slices/userSlice';
import instructorSlice from './slices/instructorSlice';

const store = configureStore({
	reducer: {
		ui: uiSlice.reducer,
		user: userSlice.reducer,
		instructor: instructorSlice.reducer,
		guide: guideSlice.reducer
	}
});

export default store;