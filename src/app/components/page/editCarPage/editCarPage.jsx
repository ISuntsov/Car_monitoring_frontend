import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFuelTypes } from '../../../store/slices/fuelTypes';
// import { getAutoParts } from '../../../store/slices/autoParts';
import { getCarById, removeCar, updateCar } from '../../../store/slices/car';
import { validator } from '../../../utils/validator';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import Loader from '../../ui/loader/loader';
import BackButton from '../../common/backButton';
import { getFuelingHistory, removeFuelingNote } from '../../../store/slices/fuelingHistory';

const EditCarPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const { carId } = useParams();
    const currentCar = useSelector(getCarById(carId))[0];
    const fuelTypes = useSelector(getFuelTypes());
    const fuelingNotesByCar = useSelector(getFuelingHistory());
    
    // const autoParts = useSelector(getAutoParts());
    
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({
        name: currentCar.name,
        model: currentCar.model,
        year: currentCar.year.slice(0, 4),
        fuelTankCapacity: currentCar.fuelTankCapacity,
        mileage: currentCar.mileage,
        fuelType: currentCar.fuelType
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
            ...data
        };
        
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
        
        dispatch(updateCar(carId, newData));
        history.push(`/cars/${carId}`);
    };
    
    const fuelTypesList = fuelTypes.map((fuelType) => ({
        label: fuelType.name,
        value: fuelType._id
    }));
    
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
    
    const handleRemoveCar = (carId) => {
        dispatch(removeCar(carId));
        // console.log(carId);
        fuelingNotesByCar.forEach(note => {
            // console.log(note);
            // console.log(note.carId === carId);
            dispatch(removeFuelingNote(note._id));
        });
        history.push(`/cars`);
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
                                Изменить запись об автомобиле
                            </button>
                            <BackButton path={`/cars/${carId}`}/>
                            <button
                                type="button"
                                className="px-4 py-2 my-2 h-[50px] text-sm rounded-md w-full cursor-pointer border
                                hover:animate-pulse text-gray-600 bg-sky-100 hover:text-white hover:bg-red-500"
                                onClick={() => handleRemoveCar(carId)}
                            >
                                Удалить автомобиль
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

export default EditCarPage;
