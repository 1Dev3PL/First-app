import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Textarea} from "../../../Common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import style from "../Posts.module.css";
import React from "react";

const maxLength50 = maxLengthCreator(50);

export type NewPostFormValuesType = {
    postText: string
}
type NewPostFormValuesKeysType = Extract<keyof NewPostFormValuesType, string>
type PropsType = {}

const AddPostForm: React.FC<InjectedFormProps<NewPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewPostFormValuesKeysType>
                ('Write post', 'postText', Textarea, [required, maxLength50])}
            </div>
            <div>
                <button className={style.addPostButton}>Add Post</button>
            </div>
        </form>
    )
};

const AddPostReduxForm = reduxForm<NewPostFormValuesType, PropsType>({form: 'addPost'})(AddPostForm);

export default AddPostReduxForm