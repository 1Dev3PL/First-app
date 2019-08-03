import React from 'react';
import style from './Messages.module.css';
import Message from "./Message/Message";

const Messages = (props) => {
    let messagesElements = props.messages
        .map(message => <Message message={message.message} key={message.id} id={message.id}/>);

    let textArea = React.createRef();

    let onAddMessage = () => {
        props.addMessage();
    };

    let onMessageChange = () => {
        let text = textArea.current.value;
        props.onMessageChange(text)
    };

    return (
        <div className={style.messages}>
            <div>
                {messagesElements}
            </div>
            <div>
                <div>
                    <textarea ref={textArea}
                              value={props.newMessageText}
                              onChange={onMessageChange}
                              placeholder='Write message'/>
                </div>
                <div>
                    <button onClick={onAddMessage}>send</button>
                </div>
            </div>
        </div>
    )
};

export default Messages;