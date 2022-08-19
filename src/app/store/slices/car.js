import { createAction, createSlice } from '@reduxjs/toolkit';
import carService from '../../services/car.service';
import localStorageService, { setSelectedCarId } from '../../services/localStorage.service';
import getStateItemsByIds from '../../utils/getStateItemsByIds';

const initialState = localStorageService.getSelectedCarId()
    ? {
        entities: null,
        isLoading: true,
        selected: localStorageService.getSelectedCarId(),
        error: null
    }
    : {
        entities: null,
        isLoading: false,
        selected: null,
        error: null
    };

const carSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {
        carsRequested: (state) => {
            state.isLoading = true;
        },
        carsReceived: (state, { payload }) => {
            state.entities = payload;
            state.isLoading = false;
            if (!state.selected) {
                state.selected = state.entities[0]._id;
            }
        },
        carsRequestFailed: (state, { payload }) => {
            state.error = payload;
            state.isLoading = false;
        },
        carCreateSuccess: (state, { payload }) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(payload);
        },
        carCreateFailed: (state, { payload }) => {
            state.error = payload;
        },
        carRemoveSuccess: (state, { payload }) => {
            state.entities = state.entities.filter(
                (c) => c._id !== payload
            );
        },
        carRemoveFailed: (state, { payload }) => {
            state.error = payload;
        },
        carUpdateSuccess: (state, { payload }) => {
            state.entities = payload;
        },
        carUpdateFailed: (state, { payload }) => {
            state.error = payload;
        },
        carSelectSuccess: (state, { payload }) => {
            state.selected = payload;
        },
        carSelectFailed: (state, { payload }) => {
            state.error = payload;
        }
    }
});
// toDo: выбросить ошибку - перенести условие в проверку до отправки dispatch
// if (state.entities.find((car) => car._id = payload)) {
// }

const { reducer: carReducer, actions } = carSlice;
const {
    carsRequested,
    carsReceived,
    carsRequestFailed,
    carCreateSuccess,
    carCreateFailed,
    carRemoveSuccess,
    carRemoveFailed,
    carUpdateSuccess,
    carUpdateFailed
} = actions;

const carCreateRequested = createAction('car/carCreateRequested');
const carRemoveRequested = createAction('car/carRemoveRequested');
const carUpdateRequested = createAction('car/carUpdateRequested');
// const carSelectRequested = createAction('car/carSelectRequested');

export const loadCarsList = (userId) => async (dispatch, getState) => {
    dispatch(carsRequested());
    try {
        const { content } = await carService.getCarsByUser(userId);
        dispatch(carsReceived(content));
        if (!localStorageService.getSelectedCarId()) {
            setSelectedCarId(getState().cars.selected);
        }
    } catch (error) {
        dispatch(carsRequestFailed(error.message));
    }
};

export const createCar = (car) => async (dispatch) => {
    dispatch(carCreateRequested());
    try {
        const { content } = await carService.create(car);
        dispatch(carCreateSuccess(content));
    } catch (error) {
        dispatch(carCreateFailed(error.message));
    }
};

export const updateCar = (carId, payload) => async (dispatch, getState) => {
    dispatch(carUpdateRequested());
    try {
        const { content } = await carService.update(carId, payload);
        const newState = [...getState().cars.entities].map((car) => {
            if (car._id === content._id) return content;
            return car;
        });
        dispatch(carUpdateSuccess(newState));
    } catch (error) {
        dispatch(carUpdateFailed(error.message));
    }
};

export const removeCar = (id) => async (dispatch) => {
    dispatch(carRemoveRequested());
    try {
        const { content } = await carService.remove(id);
        if (!content) {
            dispatch(carRemoveSuccess(id));
        }
    } catch (error) {
        dispatch(carRemoveFailed(error.message));
    }
};

export const getCars = () => (state) => state.cars.entities;
export const getCarById = (carId) => (state) => {
    const itemsIds = [];
    itemsIds.push(carId);
    return getStateItemsByIds(itemsIds, [...state.cars.entities]);
};
export const getSelectedCar = () => (state) => state.cars.selected;
export const getLastCreatedCar = () => (state) => state.cars.entities[state.cars.entities.length - 1];
export const getCarsLoadingStatus = () => (state) => state.cars.isLoading;

export default carReducer;
