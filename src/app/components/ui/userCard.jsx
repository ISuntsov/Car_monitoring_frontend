import React from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
// import { getCurrentUserId } from '../../store/slices/users';

const UserCard = ({ user }) => {
    // const history = useHistory();
    // const handleClick = () => {
    //     history.push(history.location.pathname + '/edit');
    // };
    
    return (
        <div className="container py-8 mx-auto">
            <div className="text-center w-full mb-2">
                <h1 className="text-2xl font-medium title-font mb-2 text-gray-900">Профиль пользователя</h1>
            </div>
            <div className="h-full flex flex-col items-center text-center">
                <img className="flex-shrink-0 w-[150px] h-56 object-cover object-center mb-4"
                     src={user.image}/>
                <div className="w-full">
                    <h2 className="title-font font-medium text-lg text-gray-900">Логин: {user.name}</h2>
                    <h3 className="text-gray-500 m-3">e-mail: {user.email}</h3>
                    <h4 className="text-gray-500 mb-3">Пол: {user.sex === 'male' ? 'Мужской' : 'Женский'}</h4>
                </div>
            </div>
        </div>
    );
};

UserCard.propTypes = {
    user: PropTypes.object
};

export default UserCard;
