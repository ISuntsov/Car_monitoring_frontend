import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import UserPage from '../components/page/userPage';
import EditUserPage from '../components/page/editUserPage';
import { useSelector } from 'react-redux';
import { getCurrentUserId } from '../store/slices/users';

const UserView = () => {
    const { userId, edit } = useParams();
    
    const currentUserId = useSelector(getCurrentUserId());
    
    return (
        <>
            {userId ? (
                edit ? (
                    <EditUserPage userId={currentUserId}/>
                ) : (
                    <UserPage userId={currentUserId}/>
                )) : (
                <Redirect to={'/'}/>
            )}
        </>
    );
};

export default UserView;
