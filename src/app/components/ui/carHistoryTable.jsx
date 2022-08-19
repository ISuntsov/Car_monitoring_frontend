import React from 'react';
import PropTypes from 'prop-types';
import Table from '../common/table';
import FuelType from './cells/fuelType';
import DigitCell from './cells/digitCell';
import DateCell from './cells/dateCell';

const CarHistoryTable = ({
                             notes,
                             onSort,
                             selectedSort,
                             handleClick,
                             ...rest
                         }) => {
    const columns = {
        fuelingDate: {
            path: 'date',
            name: 'Дата заправки',
            component: (note) => <DateCell format={'date'} date={note.fuelingDate}/>
        },
        fuelType: {
            path: 'type',
            name: 'Тип топлива',
            component: (note) => <FuelType id={note.fuelType}/>
        },
        quantity: { path: 'quantity', name: 'Количество, л' },
        cost: {
            path: 'cost',
            name: 'Стоимость, руб.',
            component: (note) => <DigitCell digit={note.cost}/>
        },
        currentMileage: {
            path: 'currentMileage',
            name: 'Текущий пробег, км',
            component: (note) => <DigitCell digit={note.currentMileage}/>
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={notes}
            handleClick={handleClick}
        />
    );
};

CarHistoryTable.propTypes = {
    notes: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    handleClick: PropTypes.func
};

export default CarHistoryTable;
