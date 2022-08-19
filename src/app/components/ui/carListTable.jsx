import React from 'react';
import PropTypes from 'prop-types';
import Table from '../common/table';
import FuelType from './cells/fuelType';
import ImgCell from './cells/imgCell';
import DateCell from './cells/dateCell';
import DigitCell from './cells/digitCell';

const carListTable = ({
                          notes,
                          onSort,
                          selectedSort,
                          handleClick,
                          ...rest
                      }) => {
    const columns = {
        image: {
            name: 'Изображение',
            component: (note) => <ImgCell image={note.image}/>
        },
        name: { path: 'name', name: 'Наименование' },
        model: { path: 'model', name: 'Модель' },
        year: {
            path: 'year',
            name: 'Дата выпуска',
            component: (note) => <DateCell format={'year'} date={note.year}/>
        },
        fuelType: {
            path: 'type',
            name: 'Тип топлива',
            component: (note) => <FuelType id={note.fuelType}/>
        },
        fuelTankCapacity: { path: 'fuelTankCapacity', name: 'Объём бензобака, л' },
        mileage: {
            path: 'mileage',
            name: 'Текущий пробег, км',
            component: (note) => <DigitCell digit={note.mileage}/>
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

carListTable.propTypes = {
    notes: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    handleClick: PropTypes.func
};

export default carListTable;
