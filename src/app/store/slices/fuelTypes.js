import { createSlice } from '@reduxjs/toolkit';
import isOutdated from '../../utils/isOutdated';
import fuelTypeService from '../../services/fuelType.service';

const fuelTypesSlice = createSlice({
    name: 'fuelTypes',
    initialState: {
        entities: null,
        isLoading: false,
        error: null,
        lastFetch: null
    },
    reducers: {
        fuelTypesRequested: (state) => {
            state.isLoading = true;
        },
        fuelTypesReceived: (state, { payload }) => {
            state.entities = payload;
            state.isLoading = false;
        },
        fuelTypesFailed: (state, { payload }) => {
            state.error = payload;
            state.isLoading = false;
        }
    }
});

const { reducer: fuelTypesReducer, actions } = fuelTypesSlice;
const { fuelTypesRequested, fuelTypesReceived, fuelTypesFailed } = actions;

export const loadFuelTypesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().fuelTypes;
    if (isOutdated(lastFetch)) {
        dispatch(fuelTypesRequested());
        try {
            const { content } = await fuelTypeService.get();
            dispatch(fuelTypesReceived(content));
        } catch (error) {
            dispatch(fuelTypesFailed(error.message));
        }
    }
};

export const getFuelTypes = () => (state) => state.fuelTypes.entities;
export const getFuelTypesLoadingStatus = () => (state) => state.fuelTypes.isLoading;
export const getFuelTypeById = (id) => (state) => {
    if (state.fuelTypes.entities) {
        return state.fuelTypes.entities.find((f) => f._id === id);
    }
};

export default fuelTypesReducer;
