import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFuelTypes } from '../../../store/slices/fuelTypes';
import { formatDate } from '../../../utils/formatDate';
import { getFuelingNoteById, removeFuelingNote, updateFuelingNote } from '../../../store/slices/fuelingHistory';
import { validator } from '../../../utils/validator';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import Loader from '../../ui/loader/loader';
import BackButton from '../../common/backButton';

const EditNoteHistoryPage = () => {
    const history = useHistory();
    
    const { carId, noteId } = useParams();
    const fuelTypes = useSelector(getFuelTypes());
    const currentNote = useSelector(getFuelingNoteById(noteId))[0];
    
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({
        fuelingDate: `${formatDate(currentNote.fuelingDate)}`,
        fuelType: currentNote.fuelType,
        quantity: currentNote.quantity,
        cost: currentNote.cost,
        currentMileage: currentNote.currentMileage
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
            fuelingDate: new Date(data.fuelingDate).toISOString().slice(0, 10)
        };
        
        for (const [key, value] of Object.entries(newData)) {
            if (!value) {
                if (key === 'quantity' || key === 'cost' || key === 'currentMileage') {
                    newData[key] = 0;
                }
            }
        }
        dispatch(updateFuelingNote(noteId, newData));
        history.push(`/cars/${carId}`);
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
    
    const handleRemoveNote = (noteId) => {
        dispatch(removeFuelingNote(noteId));
        history.push(`/cars/${carId}`);
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
                                Изменить запись о заправке
                            </button>
                            <BackButton path={`/cars/${carId}`}/>
                            <button
                                type="submit"
                                className="px-4 py-2 my-2 h-[50px] text-sm rounded-md w-full cursor-pointer border
                                hover:animate-pulse text-gray-600 bg-sky-100 hover:text-white hover:bg-red-500"
                                onClick={() => handleRemoveNote(noteId)}>
                                Удалить запись
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

export default EditNoteHistoryPage;
