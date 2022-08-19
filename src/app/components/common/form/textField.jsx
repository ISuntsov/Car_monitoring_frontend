import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TextField = ({ label, type, name, value, onChange, error }) => {
    const [showPassword, setShowPasswod] = useState(false);
    
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    
    const toogleShowPasswod = () => {
        setShowPasswod((prevState) => !prevState);
    };
    return (
        <div>
            <label htmlFor={name} className="relative block p-3">
                <input
                    type={showPassword ? 'text' : type}
                    id={name}
                    name={name}
                    value={value}
                    placeholder={label}
                    onChange={handleChange}
                    className='w-full px-1.5 pt-3.5 pb-1.5 placeholder-transparent
                    border-none focus:outline-sky-200/75 peer hover:bg-sky-100/50'
                />
                <span
                    className="absolute text-xs font-medium text-gray-500 transition-all left-5
                    peer-focus:text-xs peer-focus:top-3 peer-focus:translate-y-0 peer-placeholder-shown:top-1/2
                    peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm">
                    {label}
                </span>
                {type === 'password' && (
                    <button
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 right-2"
                        type="button"
                        onClick={toogleShowPasswod}
                    >
                        <svg className={'h-4 text-gray-700' + (showPassword ? ' hidden' : ' block')}
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 576 512">
                            <path fill="currentColor"
                                  d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z">
                            </path>
                        </svg>
                        
                        <svg className={'h-4 text-gray-700' + (showPassword ? ' block' : ' hidden')}
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 640 512">
                            <path fill="currentColor"
                                  d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z">
                            </path>
                        </svg>
                    
                    </button>
                )}
            </label>
            {error && <div className="text-red-600 text-xs mx-5">{error}</div>}
        </div>
    );
};

TextField.defaultProps = {
    type: 'text'
};
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextField;
