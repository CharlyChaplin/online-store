import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cart: [],
	cartLoading: false,
	cartError: ''
};

export const cartSlice = createSlice({
	name: 'cartSlice',
	initialState: initialState,
	reducers: {
		addToCart: (state, action) => {
			const findItem = state.cart.find(item => item.id === action.payload.id);
			if (findItem) {
				findItem.count++;
			} else {
				state.cart = [...state.cart, { ...action.payload, count: 1 }]
			}
		},
		minusCart: (state, action) => {
			const findItem = state.cart.find(item => item.id === action.payload.id);
			findItem.count--;
		},
		deleteCart: (state, action) => {
			state.cart = state.cart.filter(item => item.id !== action.payload.id);
		}
	}
});

export const { addToCart, minusCart, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;