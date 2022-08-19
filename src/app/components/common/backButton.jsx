import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const BackButton = ({ path }) => {
    const history = useHistory();
    return (
        <button type='button'
                className="px-4 py-2 my-2 h-[50px] text-sm rounded-md w-full cursor-pointer border
            hover:animate-pulse text-gray-600 bg-sky-100 hover:text-white hover:bg-sky-500"
                onClick={() => history.push(path)}
        >
            Вернуться назад
        </button>
    );
};

BackButton.propTypes = {
    path: PropTypes.string
};

export default BackButton;
