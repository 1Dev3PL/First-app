import React from 'react';
import style from './Dialogs.module.css'
import Friends from "./Friends/Friends";
import Messages from "./Messages/Messages";
import {useDispatch, useSelector} from "react-redux";
import {getFriendsSelector, getMessagesSelector} from "../../Redux/dialogs-selectors";
import {dialogsActions} from "../../Redux/dialogs-reducer";

const DialogsPage: React.FC = () => {

    const friends = useSelector(getFriendsSelector)
    const messages = useSelector(getMessagesSelector)

    const dispatch = useDispatch()

    const sendMessageDispatch = (messageText: string) => dispatch(dialogsActions.sendMessage(messageText))

    return (
        <div className={style.dialogs}>
            <Friends friends={friends}/>
            <Messages messages={messages} sendMessage={sendMessageDispatch}/>
        </div>
    )
};

export default DialogsPage;