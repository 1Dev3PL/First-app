import {ResultCodes, usersAPI} from '../api/api';
import {updateObjectInArray} from '../utils/object-helpers';
import {UserType} from '../types/types';
import {Dispatch} from "redux";
import {AppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";

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

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

type ActionsTypes = FollowSuccessActionType | UnfollowSuccessActionType | NextPageActionType | PreviousPageActionType |
    ChangePageActionType | SetUsersActionType | SetTotalUsersCountActionType | ToggleIsFetchingActionType |
    ToggleFollowingProgressActionType
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
export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalCount
});
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
});
export const toggleFollowingProgress = (followingInProgress: boolean, userId: number): ToggleFollowingProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    followingInProgress,
    userId
});
//2 ways to typify thunk -> first
//type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>
// --> second
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (page: number, pageSize: number): ThunkType => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let data = await usersAPI.getUsers(page, pageSize);

    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(toggleIsFetching(false));
};

const _followUnfollowFlow = async (dispatch: DispatchType,
                                   userId: number,
                                   apiMethod: any,
                                   actionCreator: (userId: number) => FollowSuccessActionType | UnfollowSuccessActionType) => {
    dispatch(toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);

    if (data.resultCode === ResultCodes.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
};

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
};