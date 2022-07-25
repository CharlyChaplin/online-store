import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axios from '../axios.js';

const initialState = {
	types: [],
	selectedType: {},
	typesLoading: false,
	typesLoadingErrorMessage: '',

	brands: [],
	selectedBrand: 1,
	brandsLoading: false,
	brandsLoadingErrorMessage: '',

	devices: [],
	selectedDevice: {},
	deviceLoading: false,
	deviceLoadingErrorMessage: '',
	deviceCount: 0,

	deviceOne: {},
	deviceOneLoading: false,
	deviceOneLoadingErrorMessage: ''
}

export const getTypes = createAsyncThunk(
	"device/getDevice",
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axios.get('api/type');
			return data;
		} catch (err) {
			if (err instanceof AxiosError)
				return rejectWithValue(err.response.data.message);
		}
	}
);
export const getBrands = createAsyncThunk(
	"device/getBrands",
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axios.get('api/brand');
			return data;
		} catch (err) {
			if (err instanceof AxiosError)
				return rejectWithValue(err.response.data.message);
		}
	}
);
export const getDevices = createAsyncThunk(
	"device/getDevices",
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axios.get('api/device');
			return data;
		} catch (err) {
			if (err instanceof AxiosError)
				return rejectWithValue(err.response.data.message);
		}
	}
);
export const getDeviceOne = createAsyncThunk(
	"device/getDeviceOne",
	async (id, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(`api/device/${id}`);
			return data;
		} catch (err) {
			if (err instanceof AxiosError)
				return rejectWithValue(err.response.data.message);
		}
	}
)


export const deviceSlice = createSlice({
	name: 'device',
	initialState: initialState,
	reducers: {
		setSelectedType: (state, action) => {
			state.selectedType = action.payload
		},
		setSelectedBrand: (state, action) => {
			state.selectedBrand = action.payload
		},
	},
	extraReducers: {
		[getTypes.pending]: (state, action) => {
			state.types = [];
			state.typesLoading = true;
			state.typesLoadingErrorMessage = '';
		},
		[getTypes.fulfilled]: (state, action) => {
			state.types = action.payload;
			state.typesLoading = false;
			state.typesLoadingErrorMessage = '';
		},
		[getTypes.rejected]: (state, action) => {
			state.types = [];
			state.typesLoading = false;
			state.typesLoadingErrorMessage = action.payload;
		},

		[getBrands.pending]: (state, action) => {
			state.brands = [];
			state.brandsLoading = true;
			state.brandsLoadingErrorMessage = '';
		},
		[getBrands.fulfilled]: (state, action) => {
			state.brands = action.payload;
			state.brandsLoading = false;
			state.brandsLoadingErrorMessage = '';
		},
		[getBrands.rejected]: (state, action) => {
			state.brands = [];
			state.brandsLoading = false;
			state.brandsLoadingErrorMessage = action.payload;
		},

		[getDevices.pending]: (state, action) => {
			state.devices = [];
			state.deviceLoading = true;
			state.deviceLoadingErrorMessage = '';
		},
		[getDevices.fulfilled]: (state, action) => {
			state.devices = action.payload.rows;
			state.deviceCount = action.payload.count;
			state.deviceLoading = false;
			state.deviceLoadingErrorMessage = '';
		},
		[getDevices.rejected]: (state, action) => {
			state.devices = [];
			state.deviceLoading = false;
			state.deviceLoadingErrorMessage = action.payload;
		},
		
		[getDeviceOne.pending]: (state, action) => {
			state.deviceOne = [];
			state.deviceOneLoading = true;
			state.deviceOneLoadingErrorMessage = '';
		},
		[getDeviceOne.fulfilled]: (state, action) => {
			state.deviceOne = action.payload;
			state.deviceOneLoading = false;
			state.deviceOneLoadingErrorMessage = '';
		},
		[getDeviceOne.rejected]: (state, action) => {
			state.deviceOne = [];
			state.deviceOneLoading = false;
			state.deviceOneLoadingErrorMessage = action.payload;
		},
	}
});


export const { setSelectedType, setSelectedBrand } = deviceSlice.actions;
export default deviceSlice.reducer;