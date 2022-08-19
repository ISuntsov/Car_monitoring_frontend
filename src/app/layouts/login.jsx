import React, { useState } from 'react';
import LoginForm from '../components/ui/loginForm';
import { useParams } from 'react-router-dom';
import RegisterForm from '../components/ui/registerForm';
import ToogleLoginForm from '../components/common/toogleLoginForm';

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === 'register' ? type : 'login'
    );
    
    const toogleFormType = () => {
        setFormType((prevState) =>
            prevState === 'register' ? 'login' : 'register'
        );
    };
    
    return (
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto text-center">
                {formType === 'register' ? (
                    <>
                        <RegisterForm/>
                        <ToogleLoginForm onClick={toogleFormType}
                                         question='Уже зарегистрированы?'
                                         action='Войти в аккаунт'/>
                    </>
                ) : (
                    <>
                        <LoginForm/>
                        <ToogleLoginForm onClick={toogleFormType}
                                         question='Не зарегистрированы?'
                                         action='Создать аккаунт'/>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login;
