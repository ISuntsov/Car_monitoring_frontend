import React from 'react';
import PropTypes from 'prop-types';

const RadioField = ({ options, name, onChange, value, label }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    
    return (
        <div className={`grid grid-rows-${options.length} grid-flow-col gap-2 flex`}>
            <label className={`row-span-${options.length} text-gray-500 place-self-center`}>{label}</label>
            {options.map((option) => (
                <div
                    key={option.name + '_' + option.value}
                    className="relative col-span-2">
                    <input
                        className="hidden group peer"
                        type="radio"
                        name={name}
                        value={option.value}
                        id={option.name + '_' + option.value}
                        checked={option.value === value}
                        onChange={handleChange}
                    />
                    <label
                        className="block p-0 text-sm font-medium transition-colors border border-sky-100 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 peer-checked:ring-1 peer-checked:ring-sky-500"
                        htmlFor={option.name + '_' + option.value}>
                        {option.name}
                    </label>
                    <svg
                        className="absolute w-4 h-4 text-sky-500 opacity-0 top-1 right-5 peer-checked:opacity-100"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" fill="currentColor">
                        <path fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"/>
                    </svg>
                </div>
            ))}
        </div>
    );
};

RadioField.propTypes = {
    options: PropTypes.array,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string
};

export default RadioField;
