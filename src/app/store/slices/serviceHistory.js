import { createAction, createSlice } from '@reduxjs/toolkit';
import serviceHistoryService from '../../services/serviceHistory.service';

const serviceHistorySlice = createSlice({
    name: 'serviceHistory',
    initialState: {
        entities: [],
        isLoading: false,
        error: null
    },
    reducers: {
        serviceHistoryRequested: (state) => {
            state.isLoading = true;
        },
        serviceHistoryReceived: (state, { payload }) => {
            state.entities = payload;
            state.isLoading = false;
        },
        serviceHistoryRequestFailed: (state, { payload }) => {
            state.error = payload;
            state.isLoading = false;
        },
        serviceNoteCreateSuccess: (state, { payload }) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(payload);
        },
        serviceNoteCreateFailed: (state, { payload }) => {
            state.error = payload;
        },
        serviceNoteUpdateSuccess: (state, { payload }) => {
            state.entities = payload;
        },
        serviceNoteUpdateFailed: (state, { payload }) => {
            state.error = payload;
        },
        serviceNoteRemoveSuccess: (state, { payload }) => {
            state.entities = state.entities.filter(
                (c) => c._id !== payload
            );
        },
        serviceNoteRemoveFailed: (state, { payload }) => {
            state.error = payload;
        }
    }
});

const { reducer: serviceHistoryReducer, actions } = serviceHistorySlice;
const {
    serviceHistoryRequested,
    serviceHistoryReceived,
    serviceHistoryRequestFailed,
    serviceNoteCreateSuccess,
    serviceNoteCreateFailed,
    serviceNoteUpdateSuccess,
    serviceNoteUpdateFailed,
    serviceNoteRemoveSuccess,
    serviceNoteRemoveFailed
} = actions;

const serviceNoteCreateRequested = createAction('users/serviceNoteCreateRequested');
const serviceNoteUpdateRequested = createAction('users/serviceNoteUpdateRequested');
const serviceNoteRemoveRequested = createAction('users/serviceNoteRemoveRequested');

export const loadServiceHistoryList = (carId) => async (dispatch) => {
    dispatch(serviceHistoryRequested());
    try {
        const { content } = await serviceHistoryService.getAllByCar(carId);
        dispatch(serviceHistoryReceived(content));
    } catch (error) {
        dispatch(serviceHistoryRequestFailed(error.message));
    }
};

export const createServiceNote = (note) => async (dispatch) => {
    dispatch(serviceNoteCreateRequested());
    try {
        const { content } = await serviceHistoryService.create(note);
        dispatch(serviceNoteCreateSuccess(content));
    } catch (error) {
        dispatch(serviceNoteCreateFailed(error.message));
    }
};

export const removeServiceNote = (id) => async (dispatch) => {
    dispatch(serviceNoteRemoveRequested());
    try {
        const { content } = await serviceHistoryService.remove(id);
        if (!content) {
            dispatch(serviceNoteRemoveSuccess(id));
        }
    } catch (error) {
        dispatch(serviceNoteRemoveFailed(error.message));
    }
};

export const updateServiceNote = (id, payload) => async (dispatch, getState) => {
    dispatch(serviceNoteUpdateRequested());
    try {
        const { content } = await serviceHistoryService.update(id, payload);
        const newState = [...getState().cars.entities].map((note) => {
            if (note._id === content._id) return content;
            return note;
        });
        dispatch(serviceNoteUpdateSuccess(newState));
    } catch (error) {
        dispatch(serviceNoteUpdateFailed(error.message));
    }
};

export const getServiceHistory = () => (state) => state.serviceHistory.entities;
export const getServiceHistoryLoadingStatus = () => (state) => state.serviceHistory.isLoading;

export default serviceHistoryReducer;
