import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({
                         label,
                         value,
                         onChange,
                         defaultOption,
                         options,
                         name,
                         error
                     }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    
    const getInputClasses = () => {
        return 'py-3 pl-5 pr-10 text-s font-medium border-gray-200 rounded-l-md ' +
            'hover:z-10 focus:outline-none focus:border-indigo-600 ' +
            'focus:z-10 hover:bg-gray-50 focus:ring-0' + (error ? ' bg-red-500' : '');
    };
    
    const optionsArray =
        !Array.isArray(options) && typeof options === 'object'
            ? Object.values(options)
            : options;
    
    return (
        <div className="inline-flex items-center text-s rounded-md">
            <label htmlFor={name} className="relative block p-3">
                <span className="m-2">{label}</span>
                <select
                    className={getInputClasses()}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}>
                    <option disabled value="">
                        {defaultOption}
                    </option>
                    {optionsArray.length > 0 &&
                        optionsArray.map((option) => (
                            <option value={option.value} key={option.value}>
                                {option.label}
                            </option>
                        ))}
                </select>
            </label>
            
            {error && <div className="text-xs text-red-600">{error}</div>}
        </div>
    );
};

SelectField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    name: PropTypes.string,
    error: PropTypes.string
};

export default SelectField;
