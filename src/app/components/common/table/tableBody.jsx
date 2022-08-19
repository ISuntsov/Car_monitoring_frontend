import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const TableBody = ({ data, handleClick, columns }) => {
    const renderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === 'function') {
                return component(item);
            }
            if (columns[column].component === 'image' || columns[column].component === 'year') {
                return component(item);
            }
            return component;
        }
        return _.get(item, columns[column].path);
    };
    return (
        <tbody className="divide-y divide-gray-100" onClick={handleClick}>
        {data.map((item) => (
            <tr key={item._id} id={item._id}
                className="px-4 py-2 text-gray-700 whitespace-pre-line text-center hover:bg-sky-100/50 align-middle leading-loose"
            >
                {Object.keys(columns).map((column) => (
                    <td key={column}>
                        {renderContent(item, column)}
                    </td>
                ))}
            </tr>
        ))}
        </tbody>
    );
};

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    handleClick: PropTypes.func,
    columns: PropTypes.object.isRequired
};

export default TableBody;
