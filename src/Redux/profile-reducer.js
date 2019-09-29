import {profileAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE';
const SET_USER_STATUS = 'profile/SET-USER-STATUS';
const DELETE_POST = 'profile/DELETE-POST';

let initialState = {
    posts: [
        {message: 'ZA WARUDO', likesCount: 44, id: 1},
        {message: 'yare yare', likesCount: 1, id: 2},
    ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
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
                posts: state.posts.filter(p => p.id != action.postId)
            };
        }
        default:
            return state;
    }
};

export default profileReducer;//()
export const addPost = (postText) => ({type: ADD_POST, postText});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
const setUserStatus = (status) => ({type: SET_USER_STATUS, status});
const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});

export const getUserProfile = (userId) => async (dispatch) => {
    let response = await profileAPI.getUserProfile(userId);

    dispatch(setUserProfile(response.data))
};

export const getUserStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getUserStatus(userId);

    dispatch(setUserStatus(response.data))
};

export const updateUserStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateUserStatus(status);

    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status))
    }
};