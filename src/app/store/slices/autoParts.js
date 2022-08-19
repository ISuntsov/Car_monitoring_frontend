import { createSlice } from '@reduxjs/toolkit';
import isOutdated from '../../utils/isOutdated';
import getStateItemsByIds from '../../utils/getStateItemsByIds';
import autoPartService from '../../services/autoPart.service';

const autoPartsSlice = createSlice({
    name: 'autoParts',
    initialState: {
        entities: null,
        isLoading: false,
        error: null,
        lastFetch: null
    },
    reducers: {
        autoPartsRequested: (state) => {
            state.isLoading = true;
        },
        autoPartsReceived: (state, { payload }) => {
            state.entities = payload;
            state.isLoading = false;
        },
        autoPartsFailed: (state, { payload }) => {
            state.error = payload;
            state.isLoading = false;
        }
    }
});

const { reducer: autoPartsReducer, actions } = autoPartsSlice;
const { autoPartsRequested, autoPartsReceived, autoPartsFailed } = actions;

export const loadAutoPartsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().autoParts;
    if (isOutdated(lastFetch)) {
        dispatch(autoPartsRequested());
        try {
            const { content } = await autoPartService.get();
            dispatch(autoPartsReceived(content));
        } catch (error) {
            dispatch(autoPartsFailed(error.message));
        }
    }
};

export const getAutoParts = () => (state) => state.autoParts.entities;
export const getAutoPartsLoadingStatus = () => (state) => state.autoParts.isLoading;
export const getAutoPartsByIds = (ids) => (state) => {
    return getStateItemsByIds(ids, state.autoParts.entities);
};

export default autoPartsReducer;
