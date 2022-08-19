import React, { useState, useEffect } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/form/textField';
import RadioField from '../common/form/radioField';
import CheckBoxField from '../common/form/checkBoxField';
import { useDispatch } from 'react-redux';
import { signUp } from '../../store/slices/users';
import { useHistory } from 'react-router-dom';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        sex: 'male',
        licence: false
    });
    
    const [errors, setErrors] = useState({});
    
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    
    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательная для заполнения'
            },
            isEmail: {
                message: 'Электронная почта введена некорректно'
            }
        },
        name: {
            isRequired: {
                message: 'Имя обязательно для заполнения'
            },
            min: {
                message: 'Имя должно быть не короче 3 символов',
                value: 3
            }
        },
        password: {
            isRequired: {
                message: 'Пароль обязателен для заполнения'
            },
            isCapitalSymbol: {
                message: 'Пароль должен содержать хотя бы одну заглавную букву'
            },
            isDigit: {
                message: 'Пароль должен содержать хотя бы одну цифру'
            },
            min: {
                message: 'Пароль должен быть не короче 8 символов',
                value: 8
            }
        },
        licence: {
            isRequired: {
                message:
                    'Вы не можете использовать наш сервис без подтверждения лицензионного солгашения'
            }
        }
    };
    
    useEffect(() => {
        validate();
    }, [data]);
    
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    const isValid = Object.keys(errors).length === 0;
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data
        };
        
        dispatch(signUp(newData));
        history.push('/cars');
    };
    
    return (
        <>
            <h1 className="text-2xl font-bold text-center text-sky-400">
                Регистрация пользователя</h1>
            <form className="px-8 pb-8 pt-2 mb-0 space-y-4 rounded-lg shadow-2xl" onSubmit={handleSubmit}>
                <TextField
                    label="E-mail"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <TextField
                    label="Имя"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <TextField
                    label="Пароль"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    error={errors.password}
                />
                <RadioField
                    options={[
                        { name: 'Male', value: 'male' },
                        { name: 'Female', value: 'female' }
                    ]}
                    value={data.sex}
                    name="sex"
                    onChange={handleChange}
                    label="Выберите Ваш пол:"
                />
                <CheckBoxField
                    value={data.licence}
                    onChange={handleChange}
                    name="licence"
                    error={errors.licence}>
                    Подтвердить <a>лицензионное соглашение</a>
                </CheckBoxField>
                <button
                    type="submit"
                    disabled={!isValid}
                    className="block w-full px-5 py-3 text-sm font-medium text-white bg-sky-400
                    hover:bg-sky-500 rounded-lg">
                    Отправить
                </button>
            </form>
        </>
    );
};

export default RegisterForm;
