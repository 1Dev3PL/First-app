import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {requestUsers, FilterType} from '../../Redux/users-reducer';
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';
import {
    getUsers,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getCurrentPage,
    getPortionSize,
    getUsersFilter
} from "../../Redux/users-selectors";
import Paginator from "../Common/Paginator/Paginator";
import UsersSearchForm from "./UsersSearchForm";

const UsersPage: React.FC = () => {
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const portionSize = useSelector(getPortionSize)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const followingInProgress = useSelector(getFollowingInProgress)
    const isFetching = useSelector(getIsFetching)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getUsers)

    const dispatch = useDispatch()

    useEffect(() => {dispatch(requestUsers(currentPage, pageSize, filter))}, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    };

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const follow = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }

    const onNextButtonPressed = () => {
        dispatch(requestUsers(currentPage + 1, pageSize, filter))
    };

    const onPreviousButtonPressed = () => {
        dispatch(requestUsers(currentPage - 1, pageSize, filter))
    };

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            {isFetching ? <Preloader/> :
                <Users users={users}
                       follow={follow}
                       unfollow={unfollow}
                       followingInProgress={followingInProgress}
                />}
            <Paginator totalItemsCount={totalUsersCount}
                       pageSize={pageSize}
                       portionSize={portionSize}
                       currentPage={currentPage}
                       onNextButtonPressed={onNextButtonPressed}
                       onPreviousButtonPressed={onPreviousButtonPressed}
                       onPageChanged={onPageChanged}/>
        </div>
    )
}

export default UsersPage