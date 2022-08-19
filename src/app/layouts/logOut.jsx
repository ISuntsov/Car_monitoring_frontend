import React, { useEffect } from 'react';
import Loader from '../components/ui/loader/loader';
import { useDispatch } from 'react-redux';
import { logOut } from '../store/slices/users';

const LogOut = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(logOut());
    }, []);
    
    return <Loader/>;
};

export default LogOut;
