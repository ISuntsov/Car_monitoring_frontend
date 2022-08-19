import React, { useState, useEffect } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/form/textField';
import CheckBoxField from '../common/form/checkBoxField';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthError, logIn } from '../../store/slices/users';

const LoginForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [data, setData] = useState({
        email: '',
        password: '',
        stayOn: false
    });
    const [errors, setErrors] = useState({});
    
    const loginError = useSelector(getAuthError());
    
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
            }
        },
        password: {
            isRequired: {
                message: 'Пароль обязателен для заполнения'
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
        
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : '/cars';
        dispatch(logIn({ payload: data, redirect }));
    };
    
    return (
        <>
            <h1 className="text-2xl font-bold text-center text-sky-400">
                Выполните вход в аккаунт</h1>
            <form className="px-8 pb-8 pt-2 mb-0 space-y-4 rounded-lg shadow-2xl" onSubmit={handleSubmit}>
                <TextField
                    label="E-mail"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <TextField
                    label="Пароль"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    error={errors.password}
                />
                <CheckBoxField
                    value={data.stayOn}
                    onChange={handleChange}
                    name="stayOn">
                    Оставаться в системе
                </CheckBoxField>
                {loginError && <p className="text-danger">{loginError}</p>}
                <button
                    type="submit"
                    disabled={!isValid}
                    className="block w-full px-5 py-3 text-sm font-medium text-white bg-sky-400 hover:bg-sky-500 rounded-lg">
                    Отправить
                </button>
            </form>
        </>
    );
};

export default LoginForm;
