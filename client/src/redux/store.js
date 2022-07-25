import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import deviceReducer from './deviceSlice';


export const store = configureStore({
	reducer: {
		user: userReducer,
		device: deviceReducer
	}
})