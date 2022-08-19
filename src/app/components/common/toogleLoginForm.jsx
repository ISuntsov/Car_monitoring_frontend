import React from 'react';
import PropTypes from 'prop-types';

const ToogleLoginForm = ({ onClick, question, action }) => {
    return (
        <p className="text-sm mt-2 text-center text-gray-500">
            {question}
            <a role="button" className="ml-2 underline" onClick={onClick}>
                {action}
            </a>
        </p>
    );
};

ToogleLoginForm.propTypes = {
    onClick: PropTypes.func,
    question: PropTypes.string,
    action: PropTypes.string
};

export default ToogleLoginForm;
