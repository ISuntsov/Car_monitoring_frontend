import { createAction, createSlice } from '@reduxjs/toolkit';
import userService from '../../services/user.service';
import authService from '../../services/auth.service';
import localStorageService from '../../services/localStorage.service';
import history from '../../utils/history';
import { generateAuthError } from '../../utils/generateAuthError';

const initialState = localStorageService.getAccessToken() && localStorageService.getTokenExpiresDate() > Date.now()
    ? {
        entities: null,
        isLoading: true,
        error: null,
        auth: { userId: localStorageService.getUserId() },
        isLoggedIn: true,
        dataLoaded: false
    }
    : {
        entities: null,
        isLoading: false,
        error: null,
        auth: null,
        isLoggedIn: false,
        dataLoaded: false
    };

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, { payload }) => {
            state.entities = payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequestFailed: (state, { payload }) => {
            state.error = payload;
            state.isLoading = false;
        },
        authRequested: (state) => {
            state.error = null;
        },
        authRequestSuccess: (state, { payload }) => {
            state.auth = payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, { payload }) => {
            state.error = payload;
        },
        userCreated: (state, { payload }) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(payload);
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        userUpdateSuccess: (state, { payload }) => {
            state.entities = payload;
        },
        userUpdateFailed: (state, { payload }) => {
            state.error = payload;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    usersRequested,
    usersReceived,
    usersRequestFailed,
    authRequestSuccess,
    authRequestFailed,
    userLoggedOut,
    userUpdateSuccess,
    userUpdateFailed
} = actions;

const authRequested = createAction('users/authRequested');
const userUpdateRequested = createAction('users/userUpdateRequested');

export const logIn =
    ({ payload, redirect }) =>
        async (dispatch) => {
            const { email, password } = payload;
            dispatch(authRequested());
            try {
                const data = await authService.logIn({ email, password });
                localStorageService.setTokens(data);
                // dispatch(authRequestSuccess({ userId: data.localId }));  // для Firebase
                dispatch(authRequestSuccess({ userId: data.userId }));
                history.push(redirect);
            } catch (error) {
                const { code, message } = error.response.data.error;
                if (code === 400) {
                    const errorMessage = generateAuthError(message);
                    dispatch(authRequestFailed(errorMessage));
                } else {
                    dispatch(authRequestFailed(error.message));
                }
            }
        };

export const signUp =
    (payload) =>
        async (dispatch) => {
            dispatch(authRequested());
            try {
                const data = await authService.register(payload);
                localStorageService.setTokens(data);
                dispatch(authRequestSuccess({ userId: data.userId }));
                history.push('/users');
            } catch (error) {
                dispatch(authRequestFailed(error.message));
            }
        };

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push('/');
};

export const updateCurrentUserParams =
    (payload) => async (dispatch, getState) => {
        dispatch(userUpdateRequested());
        try {
            const { content } = await userService.updateCurrentUser(payload);
            const newState = [...getState().users.entities].map((user) => {
                if (user._id === content._id) return content;
                return user;
            });
            
            dispatch(userUpdateSuccess(newState));
            history.push(`/users/${content._id}`);
        } catch (error) {
            dispatch(userUpdateFailed(error.message));
        }
    };

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceived(content));
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};

export const getUserList = () => (state) => state.users.entities;

export const getCurrentUserData = () => (state) => {
    return state.users.entities
        ? state.users.entities.find((u) => u._id === state.users.auth.userId)
        : null;
};
export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((u) => u._id === userId);
    }
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getUserLoadingStatus = () => (state) => state.users.isLoading;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getAuthError = () => (state) => state.users.error;

export default usersReducer;
