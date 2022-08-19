import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentUserId } from '../store/slices/users';
import { getCarById } from '../store/slices/car';
import CarsLoader from '../components/ui/hoc/carsLoader';
import CarsListPage from '../components/page/carsListPage';
import MonitorPage from '../components/page/monitorPage';
import EditCarPage from '../components/page/editCarPage';
import EditNoteHistoryPage from '../components/page/editNoteHistoryPage';

const CarMonitor = () => {
    const { carId, edit } = useParams();
    
    const currentUserId = useSelector(getCurrentUserId());
    
    const requestedCar = useSelector(getCarById(carId))[0];
    
    return (
        <>
            {currentUserId ? (
                !carId || requestedCar?.userId !== currentUserId ? (
                    <CarsListPage/>
                ) : (
                    <CarsLoader>
                        {edit === 'carEdit' ? (
                            <EditCarPage carId={carId}/>
                        ) : (
                            edit === 'noteEdit' ? (
                                <EditNoteHistoryPage/>
                            ) : (
                                <MonitorPage/>
                            )
                        )}
                    </CarsLoader>
                )
            ) : (
                <Redirect to='/'/>
            )}
        </>
    );
};

export default CarMonitor;
