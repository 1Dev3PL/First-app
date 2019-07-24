import React from 'react';
import style from './Dialogs.module.css'
import Friends from "./Friends/Friends";
import Messages from "./Messages/Messages";

const Dialogs = (props) => {
    return (
        <div className={style.dialogs}>
            <Friends friends={props.DialogsState.friends}/>
            <Messages messages={props.DialogsState.messages}
                      newMessageText={props.DialogsState.newMessageText}
                      dispatch={props.dispatch}/>
        </div>
    )
};

export default Dialogs;