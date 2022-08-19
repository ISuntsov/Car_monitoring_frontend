import React from 'react';
import PropTypes from 'prop-types';

const imgCell = ({ image }) => {
    return <img
        className="mx-auto my-auto w-10"
        src={image}
        alt=""
    />;
};
imgCell.propTypes = {
    image: PropTypes.string
};

export default imgCell;
