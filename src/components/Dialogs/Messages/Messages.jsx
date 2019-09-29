import React from 'react';
import style from './Messages.module.css';
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../Common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";

const maxLength100 = maxLengthCreator(100);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Write message'}
                       name={'messageText'}
                       component={Textarea} validate={[required, maxLength100]}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
};

const AddMessageReduxForm = reduxForm({form: 'addMessage'})(AddMessageForm);

const Messages = (props) => {
    let messagesElements = props.messages
        .map(message => <Message message={message.message} key={message.id} id={message.id}/>);

    let onAddMessage = (values) => {
        props.sendMessage(values.messageText);
    };

    return (
        <div className={style.messages}>
            <div>
                {messagesElements}
            </div>
            <AddMessageReduxForm onSubmit={onAddMessage}/>
        </div>
    )
};

export default Messages;