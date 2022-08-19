import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '../../common/form/textField';
import RadioField from '../../common/form/radioField';
import { validator } from '../../../utils/validator';
import { useDispatch } from 'react-redux';
import {
    updateCurrentUserParams
} from '../../../store/slices/users';

const EditUserPage = ({ user }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        name: user.name,
        email: user.email,
        sex: user.sex
    });
    const [errors, setErrors] = useState({});
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data
        };
        dispatch(updateCurrentUserParams(newData));
    };
    
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            password: user.password,
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
    
    return (<div className="w-[500px] mx-auto">
        <h1 className="text-2xl font-bold text-center text-sky-400">
            Изменение данных</h1>
        <form className="px-8 pb-8 pt-2 mt-2 border-t-2 space-y-4 rounded-lg shadow-2xl" onSubmit={handleSubmit}>
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
            <button
                type="submit"
                disabled={!isValid}
                className="block w-full px-5 py-3 text-sm font-medium text-white bg-sky-400
                    hover:bg-sky-500 rounded-lg">
                Отправить
            </button>
        </form>
    </div>);
};

EditUserPage.propTypes = {
    user: PropTypes.object.isRequired
};
export default EditUserPage;
