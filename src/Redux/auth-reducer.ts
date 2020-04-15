import {authAPI, ResultCodeForCaptcha, ResultCodes, securityAPI} from '../api/api';
import {stopSubmit} from 'redux-form';
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_AUTH_USER_DATA = 'auth/SET-AUTH-USER-DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET-CAPTCHA-URL-SUCCESS';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null as string | null
};

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;//()

type SetAuthUserDataPayloadActionType = {
    userId: number | null;
    email: string | null;
    login: string | null;
    isAuth: boolean;
}
type SetAuthUserDataActionType = {
    type: typeof SET_AUTH_USER_DATA;
    payload: SetAuthUserDataPayloadActionType;
}
type getCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS;
    payload: {
        captchaUrl: string;
    }
}
type ActionsTypes = SetAuthUserDataActionType | getCaptchaUrlSuccessActionType

const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_AUTH_USER_DATA, payload:
        {userId, email, login, isAuth}
});

const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}
});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let data = await authAPI.me();

    if (data.resultCode === ResultCodes.Success) {
        let {id, email, login} = data.data;
        dispatch(setAuthUserData(id, email, login, true))
    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);

    if (data.resultCode === ResultCodes.Success) {
        dispatch(getAuthUserData())
    } else {
        if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let message = data.messages.length > 0
            ? data.messages[0]
            : 'Error';
        dispatch(stopSubmit('login', {_error: message}))
    }
};

export const logout = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logout();

    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let response = await securityAPI.getCaptchaUrl();

    dispatch(getCaptchaUrlSuccess(response.data.url))
};