import {ResultCodes} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {profileAPI} from "../api/profile-api";

let initialState = {
    posts: [
        {message: 'Hi', likesCount: 44, id: 1},
        {message: 'Bye', likesCount: 1, id: 2},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
};

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD_POST': {
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
        case 'SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            };
        }
        case 'SET_USER_STATUS': {
            return {
                ...state,
                status: action.status
            };
        }
        case 'DELETE_POST': {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            };
        }
        case 'SAVE_PHOTO_SUCCESS': {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            };
        }
        default:
            return state;
    }
};

type ActionsTypes = InferActionsTypes<typeof profileActions>

export const profileActions = {
    addPost: (postText: string) => ({type: 'ADD_POST', postText} as const),
    deletePost: (postId: number) => ({type: 'DELETE_POST', postId} as const),
    setUserStatus: (status: string) => ({type: 'SET_USER_STATUS', status} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile} as const),
    setPhotoSuccess: (photos: PhotosType) => ({type: 'SAVE_PHOTO_SUCCESS', photos} as const)
}

export default profileReducer;//()


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getUserProfile(userId);

    dispatch(profileActions.setUserProfile(data))
};

export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getUserStatus(userId);

    dispatch(profileActions.setUserStatus(data))
};

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateUserStatus(status);

    if (data.resultCode === ResultCodes.Success) {
        dispatch(profileActions.setUserStatus(status))
    }
};

export const savePhoto = (photo: any): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(photo);

    if (data.resultCode === 0) {
        dispatch(profileActions.setPhotoSuccess(data.data.photos))
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