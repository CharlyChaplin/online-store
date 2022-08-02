import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import deviceReducer from './deviceSlice';
import cartReducer from './cartSlice';


export const store = configureStore({
	reducer: {
		user: userReducer,
		device: deviceReducer,
		cart: cartReducer
	}
})