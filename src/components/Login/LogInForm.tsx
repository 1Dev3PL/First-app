import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik";
import React from "react";
import style from "../Common/FormsControls/FormsControls.module.css";

type PropsType = {
    captchaUrl: string | null
    logIn: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type FormType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}

const EmailFieldValidate = (value: any) => {
    let error;
    if (!value) {
        error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Invalid email address';
    }
    return error;
}

let LogInForm: React.FC<PropsType> = React.memo((props) => {
    const submit = (values: FormType, { setSubmitting }: FormikHelpers<FormType>) => {
        props.logIn(values.email, values.password, values.rememberMe, values.captcha)
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                initialValues={{email: '', password: '', rememberMe: false, captcha: ''}}
                onSubmit={submit}>
                {({ isSubmitting}) => (
                    <Form>
                        <Field type="email" name="email" placeholder={"Email"} validate={EmailFieldValidate}/>
                        <ErrorMessage name={"email"}/>
                        <Field type="password" name="password" placeholder={"Password"}/>
                        <label htmlFor={"rememberMe"}>Remember me</label>
                         <Field type="checkbox" id="rememberMe" name="rememberMe" />

                        {props.captchaUrl && <img src={props.captchaUrl} alt={'Oops('}/>}
                        {props.captchaUrl && <Field type="text" name="captcha" placeholder={"Captcha"}/>}
                        <button type="submit" disabled={isSubmitting}>
                            Log In
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})

export default LogInForm