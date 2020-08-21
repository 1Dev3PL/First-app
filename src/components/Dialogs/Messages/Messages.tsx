import React from 'react';
import style from './Messages.module.css';
import Message from "./Message/Message";
import {MessageType} from "../../../types/types";
import AddMessageReduxForm, { NewMessageFormValuesType } from '../AddMessageForm/AddMessageForm';
import AddMessageNewForm from "../AddMessageForm/AddMessageNewForm";

type PropsType = {
    messages: Array<MessageType>
    sendMessage: (messageText: string) => void
}

const Messages: React.FC<PropsType> = (props) => {
    let messagesElements = props.messages
        .map(message => <Message message={message.message} key={message.id} id={message.id}/>);

    let onAddMessage = (values: NewMessageFormValuesType) => {
        props.sendMessage(values.messageText);
    };

    return (
        <div className={style.messages}>
            <div>
                {messagesElements}
            </div>
            {/*<AddMessageReduxForm onSubmit={onAddMessage}/>*/}
            <AddMessageNewForm sendMessage={props.sendMessage}/>
        </div>
    )
};

export default Messages;