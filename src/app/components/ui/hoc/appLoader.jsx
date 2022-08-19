import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getIsLoggedIn, loadUsersList,
    getUserLoadingStatus
} from '../../../store/slices/users';
import Loader from '../loader/loader';
import PropTypes from 'prop-types';
import { getFuelTypesLoadingStatus, loadFuelTypesList } from '../../../store/slices/fuelTypes';
import { loadAutoPartsList } from '../../../store/slices/autoParts';
import { getCarsLoadingStatus, loadCarsList } from '../../../store/slices/car';

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const userStatusLoading = useSelector(getUserLoadingStatus());
    const carStatusLoading = useSelector(getCarsLoadingStatus());
    const isLoadingFuelTypes = useSelector(getFuelTypesLoadingStatus());
    
    useEffect(() => {
        dispatch(loadFuelTypesList());
        dispatch(loadAutoPartsList());
        if (isLoggedIn) {
            dispatch(loadUsersList());
            dispatch(loadCarsList());
        }
    }, [isLoggedIn]);
    
    if (userStatusLoading || carStatusLoading || isLoadingFuelTypes) {
        return <Loader/>;
    }
    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
