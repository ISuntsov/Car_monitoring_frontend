import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === 'asc' ? 'desc' : 'asc'
            });
        } else {
            onSort({ path: item, order: 'asc' });
        }
    };
    const renderSortArrow = (selectedSort, currentPath) => {
        if (selectedSort.path === currentPath) {
            if (selectedSort.order === 'asc') {
                return <i className="bi bi-caret-down-fill"></i>;
            } else {
                return <i className="bi bi-caret-up-fill"></i>;
            }
        }
        return null;
    };
    
    return (
        <thead>
        <tr className="bg-sky-100">
            {Object.keys(columns).map((column) => (
                <th
                    key={column}
                    onClick={
                        columns[column].path
                            ? () => handleSort(columns[column].path)
                            : undefined
                    }
                    {...{ role: columns[column].path && 'button' }}
                    scope="col"
                    className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap text-center"
                >
                    {columns[column].name}
                    {renderSortArrow(selectedSort, columns[column].path)}
                </th>
            ))}
        </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
