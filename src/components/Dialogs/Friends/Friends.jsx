import React from 'react';
import style from './Friends.module.css';
import Friend from "./Friend/Friend";

const Friends = (props) => {
    let friendsElements = props.friends
        .map( friend => <Friend name={friend.name} key={friend.id} id={friend.id}/>);

    return (
        <div className={style.friends}>
            {friendsElements}
        </div>
    )
};

export default Friends;