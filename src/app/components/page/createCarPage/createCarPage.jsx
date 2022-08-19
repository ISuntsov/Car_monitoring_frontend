import React, { useState, useEffect } from 'react';
import { validator } from '../../../utils/validator';
import { useDispatch, useSelector } from 'react-redux';
import { getFuelTypes/*, getFuelTypesLoadingStatus */ } from '../../../store/slices/fuelTypes';
import { getAutoParts/*, getAutoPartsLoadingStatus */ } from '../../../store/slices/autoParts';
import { createCar } from '../../../store/slices/car';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import Loader from '../../ui/loader/loader';
import PropTypes from 'prop-types';

const CreateCarPage = ({ currentUserId }) => {
    const dispatch = useDispatch();
    
    const fuelTypes = useSelector(getFuelTypes());
    const autoParts = useSelector(getAutoParts());
    
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({
        name: '',
        model: 'н/д',
        year: '2000',
        fuelTankCapacity: 10,
        mileage: 0,
        fuelType: fuelTypes[0]._id
    });
    // todo: добавить в версии с автозапчастями
    // autoparts: []
    
    const [errors, setErrors] = useState({});
    
    useEffect(() => {
        validate();
    }, [data]);
    
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);
    
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        
        const newData = {
            ...data,
            userId: currentUserId,
            autoParts: [autoParts[0]._id],
            image: 'https://cdn-icons-png.flaticon.com/512/296/296208.png'
        };
        
        // todo: можно перенести в валидацию, т.к. несмотря на то что поля
        //  необязательные, но БД пустые значения не принимает
        for (const [key, value] of Object.entries(newData)) {
            if (!value) {
                if (key === 'model') {
                    newData[key] = 'н/д';
                }
                if (key === 'fuelTankCapacity' || key === 'mileage') {
                    newData[key] = 0;
                }
            }
        }
        
        dispatch(createCar(newData));
    };
    
    const fuelTypesList = fuelTypes.map((fuelType) => ({
        label: fuelType.name,
        value: fuelType._id
    }));
    
    // todo используется при редактировании
    // useEffect(() => {
    //     setIsLoading(true);
    //     if (!fuelTypesLoading && !autoPartsLoading && currentCar) {
    //         const newData = {
    //             ...currentCar
    //         };
    //         // qualities: transformData(currentUser.qualities)
    //
    //         console.log(newData);
    //         // setData(newData);
    //     }
    //     if (currentCar) setIsLoading(false);
    // }, [fuelTypesLoading, autoPartsLoading, currentCar]);
    
    // todo для MultiSelectField autoparts
    // const autoPartsList = autoParts.map((autoPart) => ({
    //     label: autoPart.name,
    //     value: autoPart._id
    // }));
    // function getAutoPartsListByIds(autoPartsIds) {
    //     const autoPartsArray = [];
    //     for (const partlId of autoPartsIds) {
    //         for (const part of autoParts) {
    //             if (part._id === partlId) {
    //                 autoPartsArray.push(part);
    //                 break;
    //             }
    //         }
    //     }
    //     return autoPartsArray;
    // }
    //
    // const transformData = (data) => {
    //     return getautoPartsArrayListByIds(data).map((part) => ({
    //         label: part.name,
    //         value: part._id
    //     }));
    // };
    
    const validatorConfig = {
        name: {
            isRequired: {
                message: 'Наименование обязательно для заполнения'
            },
            min: {
                message: 'Наименование должно быть не короче 3х символов',
                value: 3
            }
        },
        model: {
            isRequired: {
                message: 'Наименование обязательно для заполнения'
            },
            min: {
                message: 'Наименование должно быть не короче 3х символов',
                value: 3
            }
        },
        year: {
            year: {
                message: 'Год может принимать значения от 1900 до 2022'
            }
        },
        mileage: {
            positiveNum: {
                message: 'Число должно быть положительным'
            },
            max: {
                message: 'длина числа не должна превышать 8 символов',
                value: 8
            }
        },
        fuelTankCapacity: {
            positiveNum: {
                message: 'Число должно быть положительным'
            },
            max: {
                message: 'Длина числа не должна превышать 3х символов',
                value: 3
            }
        },
        fuelType: {
            isRequired: {
                message: 'Обязательно выберите тип топлива'
            }
        }
    };
    
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    const isValidForm = Object.keys(errors).length === 0;
    
    if (data) {
        return (
            <div className="container my-5">
                <div className='w-full grid content-center justify-items-center'>
                    {!isLoading && Object.keys(fuelTypes).length > 0 ? (
                        <form className="px-4 py-3 border rounded-2xl w-1/2 bg-sky-50/50" onSubmit={handleSubmit}>
                            <TextField
                                label="Название:"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Модель"
                                name="model"
                                value={data.model}
                                onChange={handleChange}
                                error={errors.model}
                            />
                            <TextField
                                label="Год выпуска"
                                name="year"
                                type="number"
                                value={data.year}
                                onChange={handleChange}
                                error={errors.year}
                            />
                            <SelectField
                                label="Тип топлива: "
                                defaultOption="Тип топлива"
                                name="fuelType"
                                value={data.fuelType}
                                options={fuelTypesList}
                                onChange={handleChange}
                                error={errors.fuelType}
                            />
                            <TextField
                                label="Объём бензобака, л"
                                name="fuelTankCapacity"
                                type="number"
                                value={data.fuelTankCapacity}
                                onChange={handleChange}
                                error={errors.fuelTankCapacity}
                            />
                            <TextField
                                label="Текущий пробег, км"
                                name="mileage"
                                type="number"
                                value={data.mileage}
                                onChange={handleChange}
                                error={errors.mileage}
                            />
                            <button
                                type="submit"
                                disabled={!isValidForm}
                                className="px-4 py-2 my-2 h-[50px] text-sm rounded-md w-full cursor-pointer border
                                hover:animate-pulse text-gray-600 bg-sky-100 hover:text-white hover:bg-sky-500">
                                Добавить автомобиль
                            </button>
                        </form>
                    ) : (
                        <div className='grid justify-items-end w-1/2'>
                            <Loader/>
                        </div>
                    )}
                </div>
            </div>
        );
    }
};
CreateCarPage.propTypes = {
    currentUserId: PropTypes.string
};
export default CreateCarPage;
