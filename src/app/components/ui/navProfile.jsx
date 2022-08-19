import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentUserData } from '../../store/slices/users';

const NavProfile = () => {
    const currentUser = useSelector(getCurrentUserData());
    
    const [isOpen, setOpen] = useState(false);
    const toogleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    if (!currentUser) return 'Loading...';
    
    return (
        <div
            className="inline-flex items-stretch bg-sky-100 border rounded-md cursor-pointer w-[225px] justify-center hover:bg-gray-50"
            onClick={toogleMenu}>
            <button type="button" className="pl-4 pr-0 py-0.5 text-sm text-gray-600
            hover:text-sky-600 rounded-l-md">
                {currentUser.name}
            </button>
            <div className="relative">
                <div
                    className="inline-flex items-center justify-center h-full px-2 text-gray-600
                     border-l border-gray-100 hover:text-gray-700 rounded-r-md "
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                
                {isOpen && <div
                    className="absolute top-4 -right-12 z-10 w-56 mt-4 px-0 bg-white
                    border border-gray-100 rounded-md shadow-lg"
                >
                    <div
                        className="p-2 text-gray-500 rounded-lg">
                        
                        <button type="button"
                                className="flex items-center w-full gap-2 px-2 py-6 text-sm rounded-lg
                             hover:bg-sky-100 hover:text-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 opacity-75"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            <Link
                                to={`/users/${currentUser._id}`}>
                                Профиль
                            </Link>
                        </button>
                        
                        <button type="button"
                                className="flex items-center w-full gap-2 px-2 py-6 text-sm text-red-700
                            rounded-lg hover:bg-red-100"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 opacity-75"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            <Link to="/logout">
                                Выход из профиля
                            </Link>
                        </button>
                    
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default NavProfile;
