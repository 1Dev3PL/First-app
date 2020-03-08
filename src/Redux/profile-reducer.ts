import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import { PostType, ProfileType, PhotosType } from "../types/types";

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
type SetUserProfile = {
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
const setUserProfile = (profile: ProfileType): SetUserProfile => ({type: SET_USER_PROFILE, profile});
const setPhotoSuccess = (photos: PhotosType): SetPhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos});

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getUserProfile(userId);

    dispatch(setUserProfile(response.data))
};

export const getUserStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getUserStatus(userId);

    dispatch(setUserStatus(response.data))
};

export const updateUserStatus = (status: string) => async (dispatch: any) => {
    let response = await profileAPI.updateUserStatus(status);

    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status))
    }
};

export const savePhoto = (photo: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(photo);

    if (response.data.resultCode === 0) {
        dispatch(setPhotoSuccess(response.data.data.photos))
    }
};

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const response = await profileAPI.saveProfile(profile);
    const userId = getState().auth.userId;

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0])
    }
};