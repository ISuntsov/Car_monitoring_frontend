import React from 'react';
import PropTypes from 'prop-types';
import TableBody from './tableBody';
import TableHeader from './tableHeader';

const Table = ({ onSort, selectedSort, columns, data, handleClick, children }) => {
    return (
        <table className="min-w-full text-sm divide-y divide-sky-200">
            {children || (
                <>
                    <TableHeader {...{ onSort, selectedSort, columns }} />
                    <TableBody {...{ columns, data, handleClick }} />
                </>
            )}
        </table>
    );
};
Table.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object,
    data: PropTypes.array,
    handleClick: PropTypes.func,
    children: PropTypes.array
};

export default Table;
