import React from 'react';
import style from './Friends.module.css';
import Friend from "./Friend/Friend";
import {FriendType} from "../../../types/types";

type PropsType = {
    friends: Array<FriendType>
}

const Friends: React.FC<PropsType> = ({friends}) => {
    let friendsElements = friends
        .map(friend => <Friend name={friend.name} key={friend.id} id={friend.id}/>);

    return (
        <div className={style.friends}>
            {friendsElements}
        </div>
    )
};

export default Friends;