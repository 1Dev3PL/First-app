import {ResultCodes} from '../api/api';
import {updateObjectInArray} from '../utils/object-helpers';
import {UserType} from '../types/types';
import {Dispatch} from "redux";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {usersAPI} from "../api/users-api";

let initialState = {
    users: [] as Array<UserType>,
    currentPage: 1,
    totalUsersCount: 0,
    pageSize: 10,
    isFetching: false,
    followingInProgress: [] as Array<number> //array of userId's
};

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(
                    state.users,
                    action.userId,
                    'id',
                    {followed: true}
                )
            };
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(
                    state.users,
                    action.userId,
                    'id',
                    {followed: false}
                )
            };
        case 'NEXT_PAGE':
            return {
                ...state,
                currentPage: state.currentPage + 1
            };
        case 'PREVIOUS_PAGE':
            return {
                ...state,
                currentPage: state.currentPage - 1
            };
        case 'CHANGE_PAGE':
            return {
                ...state,
                currentPage: action.pageNumber
            };
        case 'SET_USERS':
            return {
                ...state,
                users: action.users
            };
        case 'SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.totalCount
            };
        case 'TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            };
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
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
    followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    nextPage: () => ({type: 'NEXT_PAGE'} as const),
    previousPage: () => ({type: 'PREVIOUS_PAGE'} as const),
    changePage: (pageNumber: number) => ({type: 'CHANGE_PAGE', pageNumber} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
    setTotalUsersCount: (totalCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', totalCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (followingInProgress: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        followingInProgress,
        userId
    } as const)
}


//2 ways to typify thunk -> first
//type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>
// --> second
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (page: number, pageSize: number): ThunkType => async (dispatch) => {
    dispatch(usersActions.toggleIsFetching(true));
    let data = await usersAPI.getUsers(page, pageSize);

    dispatch(usersActions.setUsers(data.items));
    dispatch(usersActions.setTotalUsersCount(data.totalCount));
    dispatch(usersActions.toggleIsFetching(false));
};

const _followUnfollowFlow = async (dispatch: DispatchType,
                                   userId: number,
                                   apiMethod: any,
                                   actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(usersActions.toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);

    if (data.resultCode === ResultCodes.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(usersActions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), usersActions.followSuccess);
};

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), usersActions.unfollowSuccess);
};