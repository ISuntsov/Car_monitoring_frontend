import React, { useEffect, useState } from 'react';
import TextField from '../../common/form/textField';
import { useSelector } from 'react-redux';
import { getCars } from '../../../store/slices/car';
import _ from 'lodash';
import { paginate } from '../../../utils/paginate';
import Pagination from '../../common/pagination';
import Loader from '../../ui/loader/loader';
import filterBySearch from '../../../utils/filterBySearch';
import CarListTable from '../../ui/carListTable';
import { useHistory } from 'react-router-dom';
import CreateCarPage from '../createCarPage';
import { getCurrentUserId } from '../../../store/slices/users';

const CarsListPage = () => {
    const history = useHistory();
    
    // получаем текущий автомобиль текущего юзера и общий список авто
    const currentUserId = useSelector(getCurrentUserId());
    const carsList = useSelector(getCars());
    
    // todo: в следующей версии можно объединить в одну страницу с сервисной историей и убрать CarLoader
    // const currentCarId = useSelector(getSelectedCar());
    // заполняем Store из БД при изменении автомобиля
    // useEffect(() => {
    //     dispatch(loadFuelingHistoryList(currentCarId));
    // }, [currentCarId]);
    
    // для пагинации
    // todo: можно сделать хуки usePaginate, useSearch, useSort
    const [currentPage, setCurrentPage] = useState(1);
    const rowsInPage = 5;
    
    const [isCreateActive, setIsCreateActive] = useState(false);
    
    // поисковый запрос и сортировка массива данных по поисковому запросу
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
        const clickedCarId = event.target.parentElement.id;
        history.push(`${history.location.pathname}/${clickedCarId}`);
    };
    
    const handleCreateButtonVisible = () => {
        setIsCreateActive((prevState) => !prevState);
    };
    
    if (carsList) {
        const filteredCarsBySearchAndId = filterBySearch(carsList, searchQuery, 'name')
            .filter((car) => car.userId === currentUserId);
        
        // console.log('отфильтрованный список авто: ' + JSON.stringify(filteredCarsBySearchAndId));
        
        const count = filteredCarsBySearchAndId.length;
        
        // итоговый отсортированный массив для отправки на пагинацию
        const sortedCars = _.orderBy(
            filteredCarsBySearchAndId,
            [sortBy.path],
            [sortBy.order]
        );
        // console.log('отсортированный список авто: ' + JSON.stringify(sortedCars));
        
        // непосредственно пагинация
        const carsCrop = paginate(sortedCars, currentPage, rowsInPage);
        
        return (
            <div className="container mx-auto pt-5">
                <div className="grid grid-cols-12 w-full justify-items-center">
                    <div className='col-start-2 col-span-7 min-w-full'>
                        <TextField
                            label="Поиск по наименованию..."
                            name="searchQuery"
                            type="search"
                            value={searchQuery}
                            onChange={handleSearchQuery}
                        />
                    </div>
                    <div className="col-start-10 col-span-2 w-[90%] inline-flex items-center text-center">
                        <button type='button'
                                className={'px-4 py-0.5 h-[50px] text-sm rounded-md w-full cursor-pointer border hover:animate-pulse' +
                                    `${isCreateActive
                                        ? ' text-red-600 bg-red-100 hover:text-red-600 hover:bg-red-50'
                                        : ' text-gray-600 bg-sky-100 hover:text-sky-600 hover:bg-gray-50'}`}
                                onClick={handleCreateButtonVisible}>
                            {`${isCreateActive ? 'Отменить добавление' : 'Добавить автомобиль'}`}
                        </button>
                    </div>
                </div>
                <div
                    className={'w-full m-2 transition ease-in-out duration-500 min-h-[150px]' +
                        `${isCreateActive
                            ? ' opacity-100 translate-x-0'
                            : ' hidden opacity-0 translate-x-full'}`
                    }>
                    <CreateCarPage currentUserId={currentUserId}></CreateCarPage>
                </div>
                
                {count > 0 && (
                    <div className='relative'>
                        <div className="overflow-hidden overflow-x-auto">
                            <CarListTable
                                notes={carsCrop}
                                onSort={handleSort}
                                selectedSort={sortBy}
                                handleClick={handleInfo}
                            />
                        </div>
                        
                        <div className={`absolute top-${40 * (rowsInPage + 2)}px inset-x-0`}>
                            <Pagination
                                itemsCount={count}
                                pageSize={rowsInPage}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }
    
    return <Loader/>;
};

export default CarsListPage;
