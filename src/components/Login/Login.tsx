import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {createField, Input} from '../Common/FormsControls/FormsControls';
import {required} from '../../utils/validators/validators';
import {connect} from 'react-redux';
import {login, logout} from '../../Redux/auth-reducer';
import {Redirect} from 'react-router-dom';
import style from '../Common/FormsControls/FormsControls.module.css';
import {AppStateType} from "../../Redux/redux-store";

type LoginFormOwnPropsType = {
    captchaUrl: string | null
}
export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormValuesKeysType = Extract<keyof LoginFormValuesType, string>

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = (
    {handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesKeysType>('Email', 'email', Input, [required])}
            {createField<LoginFormValuesKeysType>('Password', 'password', Input, [required], 'password')}
            {createField<LoginFormValuesKeysType>(undefined, 'rememberMe', Input, null,
                'checkbox', 'Remember Me')}

            {captchaUrl && <img src={captchaUrl} alt={'Oops('}/>}
            {captchaUrl && createField<LoginFormValuesKeysType>('Captcha', 'captcha', Input, [required])}

            {error &&
            <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Log In</button>
            </div>
        </form>
    )
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({form: 'login'})(LoginForm);

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
    logout: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

const LoginPage: React.FC<PropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    };

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Log In</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
};

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth
    }
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>
(mapStateToProps, {login, logout})(LoginPage);