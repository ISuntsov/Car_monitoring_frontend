import { combineReducers, configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/users';
import fuelTypesReducer from './slices/fuelTypes';
import autoPartsReducer from './slices/autoParts';
import carReducer from './slices/car';
import fuelingHistoryReducer from './slices/fuelingHistory';
import serviceHistoryReducer from './slices/serviceHistory';

const rootReducer = combineReducers({
    users: usersReducer,
    fuelTypes: fuelTypesReducer,
    autoParts: autoPartsReducer,
    cars: carReducer,
    fuelingHistory: fuelingHistoryReducer,
    serviceHistory: serviceHistoryReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
