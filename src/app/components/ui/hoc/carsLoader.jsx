import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../loader/loader';
import PropTypes from 'prop-types';
import { getCarsLoadingStatus } from '../../../store/slices/car';
// import { loadServiceHistoryList } from '../../../store/slices/serviceHistory';
import { loadFuelingHistoryListAllCars } from '../../../store/slices/fuelingHistory';

const CarsLoader = ({ children }) => {
    const carsStatusLoading = useSelector(getCarsLoadingStatus());
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (carsStatusLoading) {
            // todo: ограничить загрузку авто только теми, которые принадлежат текущему юзеру, а может вообще не нужен этот блок,
            // todo: т.к. подгрузка идёт непосредственно в таблице по конкретному авто
            // todo: возможно исключить selectedCar как избыточные данные, или придумать для чего это можно использовать иначе
            // const currentCarId = useSelector(getSelectedCar());
            // dispatch(loadServiceHistoryList(currentCarId));
            dispatch(loadFuelingHistoryListAllCars());
        }
    }, [carsStatusLoading]);
    
    if (carsStatusLoading) {
        return <Loader/>;
    }
    return children;
};

CarsLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default CarsLoader;
