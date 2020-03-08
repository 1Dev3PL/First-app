import React from 'react';
import User from './User/User';
import Paginator from "../Common/Paginator/Paginator";
import {UserType} from "../../types/types";

type PropsType = {
    totalUsersCount: number;
    pageSize: number;
    currentPage: number;
    onPreviousButtonPressed: () => void;
    onNextButtonPressed: () => void;
    onPageChanged: (page: number) => void;
    users: Array<UserType>;
    followingInProgress: Array<number>;
    follow: (userId: number) => void;
    unfollow: (userId: number) => void;
}

let Users: React.FC<PropsType> = ({totalUsersCount,
                                      pageSize,
                                      currentPage,
                                      onPreviousButtonPressed,
                                      onNextButtonPressed,
                                      onPageChanged,
                                      users,
                                      ...props}) => {
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
            <div>
                {usersElements}
            </div>
            <div>
                <Paginator totalItemsCount={totalUsersCount}
                           pageSize={pageSize}
                           currentPage={currentPage}
                           onPreviousButtonPressed={onPreviousButtonPressed}
                           onNextButtonPressed={onNextButtonPressed}
                           onPageChanged={onPageChanged}/>
            </div>
        </div>
    )
};

export default Users;