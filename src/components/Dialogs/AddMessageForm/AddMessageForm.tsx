import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Textarea} from "../../Common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import React from "react";

const maxLength100 = maxLengthCreator(100);

export type NewMessageFormValuesType = {
    messageText: string
}
type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>
type PropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormValuesKeysType>
                ('Write message', 'messageText', Textarea, [required, maxLength100])}
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
};

const AddMessageReduxForm = reduxForm<NewMessageFormValuesType, PropsType>({form: 'addMessage'})(AddMessageForm);

export default AddMessageReduxForm