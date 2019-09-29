import React from 'react';
import User from './User/User';
import style from './Users.module.css';
import Paginator from "../Common/Paginator/Paginator";

let Users = (props) => {
    let usersElements = props.users
        .map(user => <User id={user.id}
                           name={user.name}
                           smallPhoto={user.photos.small}
                           status={user.status}
                           followed={user.followed}
                           key={user.id}
                           followingInProgress={props.followingInProgress}
                           toggleFollowingProgress={props.toggleFollowingProgress}
                           follow={props.follow}
                           unfollow={props.unfollow}/>);

    return (
        <div>
            <div>
                {usersElements}
            </div>
            <div>
                <Paginator totalItemsCount={props.totalUsersCount}
                           pageSize={props.pageSize}
                           currentPage={props.currentPage}
                           onPreviousButtonPressed={props.onPreviousButtonPressed}
                           onNextButtonPressed={props.onNextButtonPressed}
                           onPageChanged={props.onPageChanged}/>
            </div>
        </div>
    )
};

export default Users;