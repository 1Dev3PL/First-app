import React from 'react';
import User from './User/User';
import {UserType} from "../../types/types";

type PropsType = {
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const Users: React.FC<PropsType> = ({users, ...props}) => {
    let usersElements = users
        .map(user => <User id={user.id}
                           name={user.name}
                           smallPhoto={user.photos.small}
                           status={user.status}
                           followed={user.followed}
                           key={user.id}
                           followingInProgress={props.followingInProgress}
                           follow={props.follow}
                           unfollow={props.unfollow}/>);

    return (
        <div>
            {usersElements}
        </div>
    )
};

export default Users;