import React from 'react';
import PropTypes from 'prop-types';

const digitCell = ({ digit }) => {
    const newDigit = digit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    
    return <>{newDigit}</>;
};
digitCell.propTypes = {
    digit: PropTypes.number
};

export default digitCell;
