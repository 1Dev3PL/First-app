import React from 'react';
import style from './Dialogs.module.css'
import FriendsContainer from "./Friends/FriendsContainer";
import MessagesContainer from "./Messages/MessagesContainer";

const Dialogs = (props) => {
    return (
        <div className={style.dialogs}>
            <FriendsContainer />
            <MessagesContainer />
        </div>
    )
};

export default Dialogs;