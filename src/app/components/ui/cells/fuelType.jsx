import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getFuelTypeById, getFuelTypesLoadingStatus } from '../../../store/slices/fuelTypes';

const FuelType = ({ id }) => {
    const isLoading = useSelector(getFuelTypesLoadingStatus());
    if (isLoading) return 'Loading...';
    const fuelType = useSelector(getFuelTypeById(id));
    return <>{fuelType.name}</>;
};
FuelType.propTypes = {
    id: PropTypes.string
};

export default FuelType;
