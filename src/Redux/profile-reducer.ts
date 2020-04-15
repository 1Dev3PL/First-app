import {profileAPI, ResultCodes} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE';
const SET_USER_STATUS = 'profile/SET-USER-STATUS';
const DELETE_POST = 'profile/DELETE-POST';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE-PHOTO-SUCCESS';

let initialState = {
    posts: [
        {message: 'Hi', likesCount: 44, id: 1},
        {message: 'Bye', likesCount: 1, id: 2},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
};

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                message: action.postText,
                likesCount: 0,
                id: 5
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            };
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            };
        }
        default:
            return state;
    }
};

type ActionsTypes = AddPostActionType | DeletePostActionType | SetUserStatusActionType |
    SetUserProfileActionType | SetPhotoSuccessActionType
type AddPostActionType = {
    type: typeof ADD_POST;
    postText: string;
}
type DeletePostActionType = {
    type: typeof DELETE_POST;
    postId: number;
}
type SetUserStatusActionType = {
    type: typeof SET_USER_STATUS;
    status: string;
}
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE;
    profile: ProfileType;
}
type SetPhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS;
    photos: PhotosType;
}

export default profileReducer;//()
export const addPost = (postText: string): AddPostActionType => ({type: ADD_POST, postText});
export const deletePost = (postId: number): DeletePostActionType => ({type: DELETE_POST, postId});
const setUserStatus = (status: string): SetUserStatusActionType => ({type: SET_USER_STATUS, status});
const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});
const setPhotoSuccess = (photos: PhotosType): SetPhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getUserProfile(userId);

    dispatch(setUserProfile(data))
};

export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getUserStatus(userId);

    dispatch(setUserStatus(data))
};

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateUserStatus(status);

    if (data.resultCode === ResultCodes.Success) {
        dispatch(setUserStatus(status))
    }
};

export const savePhoto = (photo: any): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(photo);

    if (data.resultCode === 0) {
        dispatch(setPhotoSuccess(data.data.photos))
    }
};

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const response = await profileAPI.saveProfile(profile);
    const userId = getState().auth.userId;

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}));
        Promise.reject(response.data.messages[0])
    }
};