import React from 'react';
import PropTypes from 'prop-types';

const CheckBoxField = ({ name, value, onChange, children, error }) => {
    const handleChange = () => {
        onChange({ name: name, value: !value });
    };
    
    return (
        <>
            <div className="flex flex-row items-center justify-center">
                <label className="relative inline-block h-6 w-10" htmlFor={name}>
                    <input
                        className="peer sr-only"
                        type="checkbox"
                        value=""
                        id={name}
                        onChange={handleChange}
                        checked={value}
                    />
                    <span className="absolute inset-0 cursor-pointer rounded-full bg-sky-200/75
                     transition duration-200 before:absolute before:bottom-1 before:left-1
                     before:h-4 before:w-4 before:rounded-full before:bg-white before:transition
                     before:duration-200 before:shadow-sm peer-checked:bg-sky-400
                     peer-checked:before:translate-x-4 peer-focus:border-none"
                    >
                </span>
                </label>
                <div className="relative left-2">{children}</div>
            </div>
            {error && <div className="text-red-600 text-xs max-w-[90%] mx-auto">{error}</div>}
        </>
    );
};

CheckBoxField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    error: PropTypes.string
};

export default CheckBoxField;
