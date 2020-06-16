import React from 'react';
import style from './Dialogs.module.css'
import Friends from "./Friends/Friends";
import Messages from "./Messages/Messages";
import {FriendType, MessageType} from "../../types/types";

type PropsType = {
    friends: Array<FriendType>
    messages: Array<MessageType>
    sendMessage: (messageText: string) => void
}

const Dialogs: React.FC<PropsType> = (props) => {
    return (
        <div className={style.dialogs}>
            <Friends friends={props.friends}/>
            <Messages messages={props.messages} sendMessage={props.sendMessage}/>
        </div>
    )
};

export default Dialogs;