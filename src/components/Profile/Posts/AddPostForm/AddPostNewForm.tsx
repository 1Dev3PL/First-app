import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik";
import React from "react";

type PropsType = {
    addPost: (postText: string) => void
}
type FormType = {
    postText: string
}

const PostFieldValidate = (value: any) => {
    let error;
    if (!value) {
        error = 'Required';
    } else if (value.length > 100) {
        error = 'Max length is 100 symbols';
    }
    return error;
}

let AddPostNewForm: React.FC<PropsType> = React.memo((props) => {
    const submit = (values: FormType, { setSubmitting }: FormikHelpers<FormType>) => {
        props.addPost(values.postText)
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                initialValues={{postText: ''}}
                onSubmit={submit}>
                {({ isSubmitting}) => (
                    <Form>
                        <Field type="text" name="postText" placeholder={"Write post"} validate={PostFieldValidate}/>
                        <ErrorMessage name={"postText"}/>
                        <button type="submit" disabled={isSubmitting}>
                            Add Post
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})

export default AddPostNewForm