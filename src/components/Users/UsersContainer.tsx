import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {requestUsers, FilterType, follow, unfollow} from '../../Redux/users-reducer';
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
import { useHistory } from 'react-router-dom';
import * as queryString from "querystring";

type QueryParamsType = { term?: string; page?: string; friend?: string };

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
    const history = useHistory()
    
    useEffect(() => {
        const parsedSearch = queryString.parse(history.location.search.substr(1)) as QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter

        if(!!parsedSearch.page) actualPage = Number(parsedSearch.page)
        if(!!parsedSearch.term) actualFilter = {...actualFilter, term: parsedSearch.term}

        switch (parsedSearch.friend) {
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break
            case 'false': actualFilter = {...actualFilter, friend: false}
                break
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}

        if(!!filter.term) query.term = filter.term
        if(filter.friend !== null) query.friend = String(filter.friend)
        if(currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    };

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const followUser = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollowUser = (userId: number) => {
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
                       follow={followUser}
                       unfollow={unfollowUser}
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