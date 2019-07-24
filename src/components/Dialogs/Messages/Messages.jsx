import React from 'react';
import style from './Messages.module.css';
import Message from "./Message/Message";
import {sendMessageActionCreator,updateMessageTextActionCreator} from "../../../Redux/dialogs-reducer";

const Messages = (props) => {

    let messagesElements = props.messages
        .map( message => <Message message={message.message} id={message.id}/>);

    let newMessageText = props.newMessageText;

    let addMessage = () => {
        if (props.newMessageText) {
            props.dispatch(sendMessageActionCreator());
        }
    };

    let onMessageChange = (event) => {
        let text = event.target.value;
        props.dispatch(updateMessageTextActionCreator(text));
    };

    return (
        <div className={style.messages}>
            <div>
                {messagesElements}
            </div>
            <div>
                <div>
                    <textarea value={newMessageText}
                              onChange={onMessageChange}
                              placeholder='Write message'/>
                </div>
                <div>
                    <button onClick={addMessage}>send</button>
                </div>
            </div>
        </div>
    )
};

export default Messages;