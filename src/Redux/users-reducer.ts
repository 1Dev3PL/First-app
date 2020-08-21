import {APIResponseType, ResultCodes} from '../api/api';
import {updateObjectInArray} from '../utils/object-helpers';
import {UserType} from '../types/types';
import {Dispatch} from "redux";
import {InferActionsTypes, BaseThunkType} from "./redux-store";
import {usersAPI} from "../api/users-api";

let initialState = {
    users: [] as Array<UserType>,
    filter: {
        term: '',
        friend: null as null | boolean
    },
    currentPage: 1,
    totalUsersCount: 0,
    pageSize: 10,
    portionSize: 10,
    isFetching: false,
    followingInProgress: [] as Array<number> //array of userId's
};

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'DS/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(
                    state.users,
                    action.userId,
                    'id',
                    {followed: true}
                )
            };
        case 'DS/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(
                    state.users,
                    action.userId,
                    'id',
                    {followed: false}
                )
            };
        case 'DS/USERS/CHANGE_PAGE':
            return {
                ...state,
                currentPage: action.pageNumber
            };
        case 'DS/USERS/SET_USERS':
            return {
                ...state,
                users: action.users
            };
        case 'DS/USERS/SET_FILTER':
            return {
                ...state,
                filter: action.payload
            };
        case 'DS/USERS/SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.totalCount
            };
        case 'DS/USERS/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            };
        case 'DS/USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            };
        default:
            return state;
    }
};

export default usersReducer;//()

type ActionsTypes = InferActionsTypes<typeof usersActions>

export const usersActions = {
    followSuccess: (userId: number) => ({type: 'DS/USERS/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'DS/USERS/UNFOLLOW', userId} as const),
    changePage: (pageNumber: number) => ({type: 'DS/USERS/CHANGE_PAGE', pageNumber} as const),
    setUsers: (users: Array<UserType>) => ({type: 'DS/USERS/SET_USERS', users} as const),
    setFilter: (filter: FilterType) => ({type: 'DS/USERS/SET_FILTER', payload: filter} as const),
    setTotalUsersCount: (totalCount: number) => ({type: 'DS/USERS/SET_TOTAL_USERS_COUNT', totalCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'DS/USERS/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (followingInProgress: boolean, userId: number) => ({
        type: 'DS/USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
        followingInProgress,
        userId
    } as const)
}

type ThunkType = BaseThunkType<ActionsTypes>

export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => async (dispatch) => {
    dispatch(usersActions.toggleIsFetching(true));
    dispatch(usersActions.changePage(page));
    dispatch(usersActions.setFilter(filter));

    let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend);

    dispatch(usersActions.setUsers(data.items));
    dispatch(usersActions.setTotalUsersCount(data.totalCount));
    dispatch(usersActions.toggleIsFetching(false));
};

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>,
                                   userId: number,
                                   apiMethod: (userId: number) => Promise<APIResponseType>,
                                   actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(usersActions.toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);

    if (data.resultCode === ResultCodes.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(usersActions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), usersActions.followSuccess);
};

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), usersActions.unfollowSuccess);
};