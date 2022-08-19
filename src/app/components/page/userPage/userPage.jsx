import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Loader from '../../ui/loader/loader';
import UserCard from '../../ui/userCard';
import { useSelector } from 'react-redux';
import { getUserById } from '../../../store/slices/users';
import EditUserPage from '../editUserPage';

const UserPage = ({ userId }) => {
    const user = useSelector(getUserById(userId));
    const [isEditActive, setIsEditActive] = useState(false);
    const handleEdit = () => {
        setIsEditActive((prevState) => !prevState);
    };
    
    if (user) {
        return (
            <>
                <UserCard user={user}/>
                <button type='button'
                        className={'px-4 py-0.5 h-[50px] text-sm rounded-md w-full cursor-pointer border hover:animate-pulse' +
                            `${isEditActive
                                ? ' text-red-600 bg-red-100 hover:text-red-600 hover:bg-red-50'
                                : ' text-gray-600 bg-sky-100 hover:text-sky-600 hover:bg-gray-50'}`}
                        onClick={handleEdit}>
                    {`${isEditActive ? 'Отменить редактирование пользователя' : 'Редактировать данные пользователя'}`}
                </button>
                <div
                    className={'w-full m-3 transition ease-in-out duration-500 min-h-[150px]' +
                        `${isEditActive
                            ? ' opacity-100 translate-x-0'
                            : ' hidden opacity-0 translate-x-full'}`
                    }>
                    <EditUserPage user={user}/>
                </div>
            </>
        );
    } else {
        return <Loader/>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
