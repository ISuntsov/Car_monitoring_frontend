import React, { useState, useEffect } from 'react';
import { validator } from '../../../utils/validator';
import { useDispatch, useSelector } from 'react-redux';
import { getFuelTypes/*, getFuelTypesLoadingStatus */ } from '../../../store/slices/fuelTypes';
// import { getAutoParts/*, getAutoPartsLoadingStatus */ } from '../../../store/slices/autoParts';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import Loader from '../../ui/loader/loader';
import { formatDate } from '../../../utils/formatDate';
import PropTypes from 'prop-types';
import { createFuelingNote } from '../../../store/slices/fuelingHistory';

const CreateNoteHistoryPage = ({ currentCar }) => {
    const fuelTypes = useSelector(getFuelTypes());
    
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    
    const [data, setData] = useState({
        fuelingDate: `${formatDate(Date.now())}`,
        fuelType: currentCar.fuelType,
        quantity: currentCar.fuelTankCapacity,
        cost: 0,
        currentMileage: currentCar.mileage
    });
    // todo: добавить в версии с автозапчастями
    // autoparts: []
    
    const [errors, setErrors] = useState({});
    
    const fuelTypesList = fuelTypes.map((fuelType) => ({
        label: fuelType.name,
        value: fuelType._id
    }));
    
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
            carId: currentCar._id,
            fuelingDate: new Date(data.fuelingDate).toISOString().slice(0, 10)
        };
        
        for (const [key, value] of Object.entries(newData)) {
            if (!value) {
                if (key === 'quantity' || key === 'cost' || key === 'currentMileage') {
                    newData[key] = 0;
                }
            }
        }
        
        dispatch(createFuelingNote(newData));
    };
    
    const validatorConfig = {
        fuelingDate: {
            isRequired: {
                message: 'Обязательно выберите тип топлива'
            },
            date: {
                message: 'Дата не может быть позже текущей'
            }
        },
        fuelType: {
            isRequired: {
                message: 'Обязательно выберите тип топлива'
            }
        },
        quantity: {
            isRequired: {
                message: 'Количество заправленных литров обязательно для заполнения'
            },
            positiveNum: {
                message: 'Число должно быть положительным'
            },
            max: {
                message: 'длина числа не должна превышать 8 символов',
                value: 8
            }
        },
        cost: {
            isRequired: {
                message: 'Стоимость заправки обязательна для заполнения'
            },
            positiveNum: {
                message: 'Число должно быть положительным'
            },
            max: {
                message: 'длина числа не должна превышать 8 символов',
                value: 8
            }
        },
        currentMileage: {
            positiveNum: {
                message: 'Число должно быть положительным'
            },
            isRequired: {
                message: 'Обязательно укажите текущий пробег'
            },
            max: {
                message: 'длина числа не должна превышать 8 символов',
                value: 8
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
                                label="Дата заправки"
                                name="fuelingDate"
                                type="date"
                                value={data.fuelingDate}
                                onChange={handleChange}
                                error={errors.fuelingDate}
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
                                label="Количество, л"
                                name="quantity"
                                type="number"
                                value={data.quantity}
                                onChange={handleChange}
                                error={errors.quantity}
                            />
                            <TextField
                                label="Стоимость"
                                name="cost"
                                type="number"
                                value={data.cost}
                                onChange={handleChange}
                                error={errors.cost}
                            />
                            <TextField
                                label="Текущий пробег, км"
                                name="currentMileage"
                                type="number"
                                value={data.currentMileage}
                                onChange={handleChange}
                                error={errors.currentMileage}
                            />
                            <button
                                type="submit"
                                disabled={!isValidForm}
                                className="px-4 py-2 my-2 h-[50px] text-sm rounded-md w-full cursor-pointer border
                                hover:animate-pulse text-gray-600 bg-sky-100 hover:text-white hover:bg-sky-500">
                                Добавить запись о заправке
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
    
    return <h1>Create</h1>;
};

CreateNoteHistoryPage.propTypes = {
    currentCar: PropTypes.object
};

export default CreateNoteHistoryPage;
