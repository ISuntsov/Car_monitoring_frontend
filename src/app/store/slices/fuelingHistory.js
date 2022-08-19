import { createAction, createSlice } from '@reduxjs/toolkit';
import fuelingHistoryService from '../../services/fuelingHistory.service';
import getStateItemsByIds from '../../utils/getStateItemsByIds';

const fuelingHistorySlice = createSlice({
    name: 'fuelingHistory',
    initialState: {
        entities: null,
        isLoading: false,
        error: null
    },
    reducers: {
        fuelingHistoryRequested: (state) => {
            state.isLoading = true;
        },
        fuelingHistoryReceived: (state, { payload }) => {
            state.entities = payload;
            state.isLoading = false;
        },
        fuelingHistoryRequestFailed: (state, { payload }) => {
            state.error = payload;
            state.isLoading = false;
        },
        fuelingNoteCreateSuccess: (state, { payload }) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(payload);
        },
        fuelingNoteCreateFailed: (state, { payload }) => {
            state.error = payload;
        },
        fuelingNoteUpdateSuccess: (state, { payload }) => {
            state.entities = payload;
        },
        fuelingNoteUpdateFailed: (state, { payload }) => {
            state.error = payload;
        },
        fuelingNoteRemoveSuccess: (state, { payload }) => {
            state.entities = state.entities.filter(
                (c) => c._id !== payload
            );
        },
        fuelingNoteRemoveFailed: (state, { payload }) => {
            state.error = payload;
        }
    }
});

const { reducer: fuelingHistoryReducer, actions } = fuelingHistorySlice;
const {
    fuelingHistoryRequested,
    fuelingHistoryReceived,
    fuelingHistoryRequestFailed,
    fuelingNoteCreateSuccess,
    fuelingNoteCreateFailed,
    fuelingNoteUpdateSuccess,
    fuelingNoteUpdateFailed,
    fuelingNoteRemoveSuccess,
    fuelingNoteRemoveFailed
} = actions;

const fuelingNoteCreateRequested = createAction('users/fuelingNoteCreateRequested');
const fuelingNoteUpdateRequested = createAction('users/fuelingNoteUpdateRequested');
const fuelingNoteRemoveRequested = createAction('users/fuelingNoteRemoveRequested');

export const loadFuelingHistoryListAllCars = () => async (dispatch) => {
    dispatch(fuelingHistoryRequested());
    try {
        const { content } = await fuelingHistoryService.getAll();
        dispatch(fuelingHistoryReceived(content));
    } catch (error) {
        dispatch(fuelingHistoryRequestFailed(error.message));
    }
};

export const loadFuelingHistoryListByCar = (currentCarId) => async (dispatch) => {
    dispatch(fuelingHistoryRequested());
    try {
        const { content } = await fuelingHistoryService.getAll();
        // content.forEach((car) => console.log(car));
        const newContent = content.filter(car => car.carId === currentCarId);
        dispatch(fuelingHistoryReceived(newContent));
    } catch (error) {
        dispatch(fuelingHistoryRequestFailed(error.message));
    }
};

export const createFuelingNote = (note) => async (dispatch) => {
    dispatch(fuelingNoteCreateRequested());
    try {
        const { content } = await fuelingHistoryService.create(note);
        dispatch(fuelingNoteCreateSuccess(content));
    } catch (error) {
        dispatch(fuelingNoteCreateFailed(error.message));
    }
};

export const updateFuelingNote = (noteId, payload) => async (dispatch, getState) => {
    dispatch(fuelingNoteUpdateRequested());
    try {
        const { content } = await fuelingHistoryService.update(noteId, payload);
        const newState = [...getState().cars.entities].map((note) => {
            if (note._id === content._id) return content;
            return note;
        });
        dispatch(fuelingNoteUpdateSuccess(newState));
    } catch (error) {
        console.log(error);
        dispatch(fuelingNoteUpdateFailed(error.message));
    }
};

export const removeFuelingNote = (noteId) => async (dispatch) => {
    dispatch(fuelingNoteRemoveRequested());
    try {
        const { content } = await fuelingHistoryService.remove(noteId);
        if (!content) {
            dispatch(fuelingNoteRemoveSuccess(noteId));
        }
    } catch (error) {
        dispatch(fuelingNoteRemoveFailed(error.message));
    }
};

export const getFuelingHistory = () => (state) => state.fuelingHistory.entities;
export const getFuelingHistoryLoadingStatus = () => (state) => state.fuelingHistory.isLoading;
export const getFuelingNoteById = (noteId) => (state) => {
    const itemsIds = [];
    itemsIds.push(noteId);
    return getStateItemsByIds(itemsIds, [...state.fuelingHistory.entities]);
};

export default fuelingHistoryReducer;
