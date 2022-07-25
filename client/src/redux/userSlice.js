import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../axios';

const initialState = {
	userData: [],
	isAuth: false,
	isAdmin: false,
	isLoading: false,
	errorDesc: ''
}

export const fetchLogin = createAsyncThunk(
	'user/fetchLogin',
	async (params, { rejectWithValue }) => {
		try {
			const { data } = await axios.post("api/user/login", params);
			return data;
		} catch (err) {
			return rejectWithValue(err.response.data.message);
		}

	}
);
export const fetchRegistation = createAsyncThunk(
	'user/fetchRegistration',
	async (params, { rejectWithValue }) => {
		try {
			const { data } = await axios.post("api/user/registration", params);
			return data;
		} catch (err) {
			return rejectWithValue(err.response.data.message);
		}
	}
);
export const fetchAuth = createAsyncThunk(
	'user/fetchAuth',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axios.get("api/user/auth");
			return data;
		} catch (err) {
			return rejectWithValue(err.response.data.message);
		}
	}
)

export const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		setAuth: (state, action) => {
			state.isAuth = action.payload
		},
		setLogout: (state, action) => {
			state.userData = [];
		},
		setAdmin: (state, action) => {
			state.isAdmin = action.payload
		}
	},
	extraReducers: {
		[fetchLogin.pending]: (state, action) => {
			state.isLoading = true;
			state.userData = [];
			state.errorDesc = '';
		},
		[fetchLogin.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.userData = action.payload;
			state.errorDesc = '';
		},
		[fetchLogin.rejected]: (state, action) => {
			state.isLoading = false;
			state.errorDesc = action.payload;
			state.userData = [];
		},

		[fetchRegistation.pending]: (state, action) => {
			state.isLoading = true;
			state.userData = [];
			state.errorDesc = '';
		},
		[fetchRegistation.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.userData = action.payload;
			state.errorDesc = '';
		},
		[fetchRegistation.rejected]: (state, action) => {
			state.isLoading = false;
			state.errorDesc = action.payload;
			state.userData = [];
		},

		[fetchAuth.pending]: (state, action) => {
			state.isLoading = true;
			state.userData = [];
			state.errorDesc = '';
		},
		[fetchAuth.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.userData = action.payload;
			state.errorDesc = '';
			state.isAuth = true;
		},
		[fetchAuth.rejected]: (state, action) => {
			state.isLoading = false;
			state.errorDesc = '';
			state.userData = [];
			state.isAuth = false;
		},

	}
})


export const { setAuth, setLogout, setAdmin } = userSlice.actions;
export default userSlice.reducer;