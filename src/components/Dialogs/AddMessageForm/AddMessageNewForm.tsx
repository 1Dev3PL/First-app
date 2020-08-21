import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik";
import React from "react";
import style from "../Common/FormsControls/FormsControls.module.css";

type PropsType = {
    sendMessage: (messageText: string) => void
}
type FormType = {
    message: string
}

const MessageFieldValidate = (value: any) => {
    let error;
    if (!value) {
        error = 'Required';
    } else if (value.length > 100) {
        error = 'Max length is 100 symbols';
    }
    return error;
}

let AddMessageNewForm: React.FC<PropsType> = React.memo((props) => {
    const submit = (values: FormType, { setSubmitting }: FormikHelpers<FormType>) => {
        props.sendMessage(values.message)
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                initialValues={{message: ''}}
                onSubmit={submit}>
                {({ isSubmitting}) => (
                    <Form>
                        <Field type="text" name="message" placeholder={"Write message"} validate={MessageFieldValidate}/>
                        <ErrorMessage name={"message"}/>
                        <button type="submit" disabled={isSubmitting}>
                            Send
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})

export default AddMessageNewForm