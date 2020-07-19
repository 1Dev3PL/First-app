import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../Redux/users-reducer";

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
type FormType = {
    term: string,
    friend: 'null' | 'true' | 'false'
}
const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

let UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
    const submit = (values: FormType, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }

        props.onFilterChanged(filter)
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                initialValues={{term: '', friend: 'null'}}
                validate={usersSearchFormValidate}
                onSubmit={submit}>
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only not followed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Search
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})

export default UsersSearchForm