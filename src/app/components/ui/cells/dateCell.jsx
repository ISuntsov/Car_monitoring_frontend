import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../../utils/formatDate';

const dateCell = ({ date, format }) => {
    const formattedDate = format === 'date'
        ? `${formatDate(date)}`
        : new Date(date).getFullYear();
    
    return <>{formattedDate}</>;
};
dateCell.propTypes = {
    date: PropTypes.string
};

export default dateCell;
