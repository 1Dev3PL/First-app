import {usersAPI} from '../api/api';
import {updateObjectInArray} from '../utils/object-helpers';
import {UserType} from '../types/types';

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const NEXT_PAGE = 'users/NEXT-PAGE';
const PREVIOUS_PAGE = 'users/PREVIOUS-PAGE';
const CHANGE_PAGE = 'users/CHANGE-PAGE';
const SET_USERS = 'users/SET-USERS';
const SET_TOTAL_USERS_COUNT = 'users/SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE-IS-FOLLOWING-PROGRESS';


let initialState = {
    users: [] as Array<UserType>,
    currentPage: 1,
    totalUsersCount: 0,
    pageSize: 10,
    isFetching: false,
    followingInProgress: [] as Array<number> //array of userId's
};

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(
                    state.users,
                    action.userId,
                    'id',
                    {followed: true}
                )
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(
                    state.users,
                    action.userId,
                    'id',
                    {followed: false}
                )
            };
        case NEXT_PAGE:
            return {
                ...state,
                currentPage: state.currentPage + 1
            };
        case PREVIOUS_PAGE:
            return {
                ...state,
                currentPage: state.currentPage - 1
            };
        case CHANGE_PAGE:
            return {
                ...state,
                currentPage: action.pageNumber
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case TOGGLE_IS_FOLLOWING_PROGRESS:
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

type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
type NextPageActionType = {
    type: typeof NEXT_PAGE;
}
type PreviousPageActionType = {
    type: typeof PREVIOUS_PAGE;
}
type ChangePageActionType = {
    type: typeof CHANGE_PAGE;
    pageNumber: number;
}
type SetUsersActionType = {
    type: typeof SET_USERS;
    users: Array<UserType>;
}
type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT;
    totalCount: number;
}
type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING;
    isFetching: boolean;
}
type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
    followingInProgress: boolean;
    userId: number;
}

const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, userId});
const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({type: UNFOLLOW, userId});
export const nextPage = (): NextPageActionType => ({type: NEXT_PAGE});
export const previousPage = (): PreviousPageActionType => ({type: PREVIOUS_PAGE});
export const changePage = (pageNumber: number): ChangePageActionType => ({type: CHANGE_PAGE, pageNumber});
const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users});
export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, totalCount});
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (followingInProgress: boolean, userId: number): ToggleFollowingProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    followingInProgress,
    userId
});

export const requestUsers = (page: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    let response = await usersAPI.getUsers(page, pageSize);

    dispatch(setUsers(response.data.items));
    dispatch(setTotalUsersCount(response.data.totalCount));
    dispatch(toggleIsFetching(false));
};

const followUnfollowFlow = async (dispatch: any, userId: any, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId: number) => async (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
};

export const unfollow = (userId: number) => async (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
};