import React from 'react';
import style from './Dialogs.module.css'
import Friends from "./Friends/Friends";
import Messages from "./Messages/Messages";

const Dialogs = (props) => {
    return (
        <div className={style.dialogs}>
            <Friends friends={props.friends}/>
            <Messages messages={props.messages} sendMessage={props.sendMessage}/>
        </div>
    )
};

export default Dialogs;