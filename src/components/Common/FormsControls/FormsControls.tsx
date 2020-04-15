import React from 'react';
import style from './FormsControls.module.css';
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {FieldValidatorType} from "../../../utils/validators/validators";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error},children}) => {
    const hasError = touched && error;
    return (
        <div className={style.formControl + ' ' + (hasError ? style.error : '')}>
            {children}
            {hasError && <span>{error}</span>}
        </div>
    )
};

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    //const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
};

export const Input: React.FC<WrappedFieldProps> = (props) => {
    //const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
};

export function createField<LoginFormValuesTypeKeys extends string>(placeholder: string | undefined,
                            name: LoginFormValuesTypeKeys,
                            component: React.FC<WrappedFieldProps>,
                            validators: Array<FieldValidatorType> | null,
                            type?: string,
                            text = '') {
    return (
        <div>
            <Field placeholder={placeholder}
                   name={name}
                   component={component}
                   validate={validators}
                   type={type}/>
            {text}
        </div>
    )
};