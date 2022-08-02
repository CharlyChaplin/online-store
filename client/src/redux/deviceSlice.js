import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axios from '../axios.js';

const initialState = {
	types: [],
	selectedType: null,
	typesLoading: false,
	typesLoadingErrorMessage: '',

	brands: [],
	selectedBrand: null,
	brandsLoading: false,
	brandsLoadingErrorMessage: '',

	devices: [],
	selectedDevice: {},
	deviceLoading: false,
	deviceLoadingErrorMessage: '',
	deviceCount: 0,

	deviceOne: {},
	deviceOneLoading: false,
	deviceOneLoadingErrorMessage: '',

	page: 1,
	limit: 4
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
	async ({ selectedType, selectedBrand, page, limit = initialState.limit }, { rejectWithValue }) => {
		try {
			const { data } = await axios.get('api/device', {
				params: {
					typeId: selectedType,
					brandId: selectedBrand,
					page,
					limit
				}
			});
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
);
export const createDevice = createAsyncThunk(
	"device/createDevice",
	async (formData, { rejectWithValue }) => {
		try {
			const { data } = await axios.post("api/device", formData);
			return data;
		} catch (err) {
			if (err instanceof AxiosError)
				return rejectWithValue(err.response.data.message);
		}
	}
);
export const deleteDevice = createAsyncThunk(
	"device/deleteType",
	async (deleteDeviceId, { rejectWithValue }) => {
		try {
			const { data } = await axios.delete('api/device/delete', {
				data: { id: deleteDeviceId }
			});
			return data;
		} catch (err) {
			if (err instanceof AxiosError)
				return rejectWithValue(err.response.data.message);
		}
	}
);
export const createType = createAsyncThunk(
	"device/createType",
	async (newType, { rejectWithValue }) => {
		try {
			const { data } = await axios.post('api/type', { name: newType });
			return data;
		} catch (err) {
			if (err instanceof AxiosError)
				return rejectWithValue(err.response.data.message);
		}
	}
);
export const deleteType = createAsyncThunk(
	"device/deleteType",
	async (deleteType, { rejectWithValue }) => {
		try {
			const { data } = await axios.delete('api/type', {
				data: { name: deleteType }
			});
			return data;
		} catch (err) {
			if (err instanceof AxiosError)
				return rejectWithValue(err.response.data.message);
		}
	}
);
export const createBrand = createAsyncThunk(
	"device/createBrand",
	async (newBrand, { rejectWithValue }) => {
		try {
			const { data } = await axios.post('api/brand', { name: newBrand });
			return data;
		} catch (err) {
			if (err instanceof AxiosError)
				return rejectWithValue(err.response.data.message);
		}
	}
);
export const deleteBrand = createAsyncThunk(
	"device/deleteBrand",
	async (deleteBrand, { rejectWithValue }) => {
		try {
			const { data } = await axios.delete('api/brand', {
				data: { name: deleteBrand }
			});
			return data;
		} catch (err) {
			if (err instanceof AxiosError)
				return rejectWithValue(err.response.data.message);
		}
	}
);


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
		setPage: (state, action) => {
			state.page = action.payload
		},
		setLimit: (state, action) => {
			state.limit = action.payload
		},
		resetFilter: (state, action) => {
			state.selectedType = null
			state.selectedBrand = null
		}
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

		[createDevice.pending]: (state, action) => {
			state.deviceLoading = true;
			state.deviceLoadingErrorMessage = '';
		},
		[createDevice.fulfilled]: (state, action) => {
			state.deviceLoading = false;
			state.deviceLoadingErrorMessage = '';
		},
		[createDevice.rejected]: (state, action) => {
			state.deviceLoading = false;
			state.deviceLoadingErrorMessage = action.payload;
		},

		[deleteDevice.pending]: (state, action) => {
			state.deviceLoading = true;
			state.deviceLoadingErrorMessage = '';
		},
		[deleteDevice.fulfilled]: (state, action) => {
			state.deviceLoading = false;
			state.deviceLoadingErrorMessage = '';
		},
		[deleteDevice.rejected]: (state, action) => {
			state.deviceLoading = false;
			state.deviceLoadingErrorMessage = action.payload;
		},

		[createType.pending]: (state, action) => {
			state.typesLoading = true;
			state.typesLoadingErrorMessage = '';
		},
		[createType.fulfilled]: (state, action) => {
			state.typesLoading = false;
			state.typesLoadingErrorMessage = '';
		},
		[createType.rejected]: (state, action) => {
			state.typesLoading = false;
			state.typesLoadingErrorMessage = action.payload;
		},

		[deleteType.pending]: (state, action) => {
			state.typesLoading = true;
			state.typesLoadingErrorMessage = '';
		},
		[deleteType.fulfilled]: (state, action) => {
			state.typesLoading = false;
			state.typesLoadingErrorMessage = '';
		},
		[deleteType.rejected]: (state, action) => {
			state.typesLoading = false;
			state.typesLoadingErrorMessage = action.payload;
		},

		[createBrand.pending]: (state, action) => {
			state.brandsLoading = true;
			state.brandsLoadingErrorMessage = '';
		},
		[createBrand.fulfilled]: (state, action) => {
			state.brandsLoading = false;
			state.brandsLoadingErrorMessage = '';
		},
		[createBrand.rejected]: (state, action) => {
			state.brandsLoading = false;
			state.brandsLoadingErrorMessage = action.payload;
		},

		[deleteBrand.pending]: (state, action) => {
			state.brandsLoading = true;
			state.brandsLoadingErrorMessage = '';
		},
		[deleteBrand.fulfilled]: (state, action) => {
			state.brandsLoading = false;
			state.brandsLoadingErrorMessage = '';
		},
		[deleteBrand.rejected]: (state, action) => {
			state.brandsLoading = false;
			state.brandsLoadingErrorMessage = action.payload;
		},
	}
});


export const { setSelectedType, setSelectedBrand, setPage, setLimit, resetFilter } = deviceSlice.actions;
export default deviceSlice.reducer;