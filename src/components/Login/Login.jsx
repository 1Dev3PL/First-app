import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {createField, Input} from '../Common/FormsControls/FormsControls';
import {required} from '../../utils/validators/validators';
import {connect} from 'react-redux';
import {login, logout} from '../../Redux/auth-reducer';
import {Redirect} from 'react-router-dom';
import style from '../Common/FormsControls/FormsControls.module.css';

const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', Input, [required])}
            {createField('Password', 'password', Input, [required], 'password')}
            {createField(null, 'checkbox', Input, null, 'checkbox', 'Remember Me')}

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

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const LoginPage = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    };

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Log In</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
};

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
};

export default connect(mapStateToProps, {login, logout})(LoginPage);