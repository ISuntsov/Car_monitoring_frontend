import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { paginate } from '../../../utils/paginate';
import Pagination from '../../common/pagination';
import _ from 'lodash';
import Loader from '../../ui/loader/loader';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../../common/form/textField';
import {
    getFuelingHistory,
    loadFuelingHistoryListByCar
} from '../../../store/slices/fuelingHistory';
import CarHistoryTable from '../../ui/carHistoryTable';
import filterBySearch from '../../../utils/filterBySearch';
import { useHistory, useParams } from 'react-router-dom';
import { getCarById } from '../../../store/slices/car';
import CreateNoteHistoryPage from '../createNoteHistoryPage';

const MonitorPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { carId } = useParams();
    const currentCar = useSelector(getCarById(carId))[0];
    // получаем текущий автомобиль текущего юзера
    
    // заполняем Store из БД при изменении автомобиля
    useEffect(() => {
        dispatch(loadFuelingHistoryListByCar(carId));
    }, [carId]);
    
    // получаем список данных из Store для вывода в таблицу
    const notesHistory = useSelector(getFuelingHistory());
    
    // для пагинации
    const [currentPage, setCurrentPage] = useState(1);
    const rowsInPage = 5;
    
    // поисковый запрос и сортировка массива данных
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState({ path: 'date', order: 'desc' });
    
    // при использовании поиска сбрасывает пагинацию на первую страницу
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);
    
    const handleSearchQuery = ({ value }) => {
        setSearchQuery(value.trim());
    };
    
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    
    const handleInfo = (event) => {
        const clickedNoteId = event.target.parentElement.id;
        history.push(`${history.location.pathname}/noteEdit/${clickedNoteId}`);
    };
    
    const handleEditCar = () => {
        history.push(`/cars/${carId}/carEdit`);
        // history.push(`${history.location.pathname}/carEdit`);
    };
    
    const [isCreateActive, setIsCreateActive] = useState(false);
    const handleCreateNote = () => {
        setIsCreateActive((prevState) => !prevState);
    };
    
    if (notesHistory) {
        const filteredNotesHistoryBySearchAndId = filterBySearch(notesHistory, searchQuery, 'fuelingDate')
            .filter((note) => note.carId === carId);
        
        const count = filteredNotesHistoryBySearchAndId.length;
        
        // итоговый отсортированный массив для отправки на пагинацию
        const sortedNotes = _.orderBy(
            filteredNotesHistoryBySearchAndId,
            [sortBy.path],
            [sortBy.order]
        );
        
        // непосредственно пагинация
        const notesCrop = paginate(sortedNotes, currentPage, rowsInPage);
        
        return (
            <div className="container mx-auto pt-5">
                <div className="grid grid-cols-12 w-full justify-items-center">
                    <div className='p-2 col-start-1 col-span-3 text-center'>
                        <div className="text-xl underline">{currentCar.name}</div>
                        <div className="">Записей: {notesHistory.length}</div>
                    </div>
                    <div className='col-start-4 col-span-3 min-w-full'>
                        <TextField
                            label="Поиск по дате..."
                            name="searchQuery"
                            type="search"
                            value={searchQuery}
                            onChange={handleSearchQuery}
                        />
                    </div>
                    <div className="col-start-7 col-span-3 w-[90%] inline-flex items-center text-center">
                        <button type='button'
                                className='px-4 py-0.5 h-[50px] text-sm rounded-md w-full cursor-pointer border hover:animate-pulse
                                text-gray-600 bg-sky-100 hover:text-sky-600 hover:bg-gray-50'
                                onClick={handleEditCar}>
                            Редактировать данные автомобиля
                        </button>
                    </div>
                    <div className="col-start-10 col-span-3 w-[90%] inline-flex items-center text-center">
                        <button type='button'
                                className={'px-4 py-0.5 h-[50px] text-sm rounded-md w-full cursor-pointer border hover:animate-pulse' +
                                    `${isCreateActive
                                        ? ' text-red-600 bg-red-100 hover:text-red-600 hover:bg-red-50'
                                        : ' text-gray-600 bg-sky-100 hover:text-sky-600 hover:bg-gray-50'}`}
                                onClick={handleCreateNote}>
                            {`${isCreateActive ? 'Отменить добавление записи' : 'Добавить запись в таблицу'}`}
                        </button>
                    </div>
                </div>
                <div
                    className={'w-full m-3 transition ease-in-out duration-500 min-h-[150px]' +
                        `${isCreateActive
                            ? ' opacity-100 translate-x-0'
                            : ' hidden opacity-0 translate-x-full'}`
                    }>
                    <CreateNoteHistoryPage currentCar={currentCar}></CreateNoteHistoryPage>
                </div>
                
                {count > 0 && (
                    <div className="overflow-hidden overflow-x-auto">
                        <CarHistoryTable
                            notes={notesCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            handleClick={handleInfo}
                        />
                    </div>
                )}
                
                <div className={`absolute top-${40 * (rowsInPage + 2)}px inset-x-0`}>
                    <Pagination
                        itemsCount={count}
                        pageSize={rowsInPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        );
    }
    
    return <Loader/>;
};
MonitorPage.propTypes = {
    notesHistory: PropTypes.array
};

export default MonitorPage;
