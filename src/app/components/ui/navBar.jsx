import React from 'react';
import { NavLink } from 'react-router-dom';
import NavProfile from './navProfile';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../store/slices/users';

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    
    return (
        <nav
            className="flex px-5 h-[35px] bg-sky-300 items-center shadow-md">
            <div className="grid grid-cols-2 w-full">
                
                {isLoggedIn ? (
                    <>
                        <div className="col-start-1 w-[250px] inline-flex">
                            <NavLink to="/cars" className="px-4 py-0.5 text-sm text-gray-600
                        hover:text-sky-600 hover:bg-gray-50
                        rounded-l-md bg-sky-100 border rounded-md">
                                Список автомобилей
                            </NavLink>
                        </div>
                        <div className="col-end-12">
                            <NavProfile/>
                        </div>
                    </>) : (
                    <>
                        <div className="col-start-1 w-[120px] inline-flex">
                            <NavLink
                                to="/" exact
                                className="px-4 py-0.5 text-sm text-gray-600
                        hover:text-sky-600 hover:bg-gray-50
                        rounded-l-md bg-sky-100 border rounded-md"
                            >
                                На главную
                            </NavLink>
                        </div>
                        <div className="col-end-12 inline-flex">
                            <NavLink to="/login"
                                     className="px-4 py-0.5 text-sm text-gray-600
                        hover:text-sky-600 hover:bg-gray-50
                        rounded-l-md bg-sky-100 border rounded-md">
                                Войти
                            </NavLink>
                        </div>
                    </>)}
            </div>
        </nav>
    );
};

export default NavBar;
