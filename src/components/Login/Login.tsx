import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {logIn} from '../../Redux/auth-reducer';
import {Redirect} from 'react-router-dom';
import LogInForm from "./LogInForm";
import {getCaptchaUrlSelector, getIsAuthSelector} from "../../Redux/auth-selectors";

const LoginPage: React.FC = () => {
    const captchaUrl = useSelector(getCaptchaUrlSelector)
    const isAuth = useSelector(getIsAuthSelector)

    const dispatch = useDispatch()

    const logInDispatch = (email: string, password: string, rememberMe: boolean, captcha: string) => {
        dispatch(logIn(email, password, rememberMe, captcha))
    }

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Log In</h1>
            <LogInForm captchaUrl={captchaUrl} logIn={logInDispatch}/>
        </div>
    )
};

export default LoginPage