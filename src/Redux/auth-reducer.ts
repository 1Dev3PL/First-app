import {ResultCodeForCaptcha, ResultCodes} from '../api/api';
import {stopSubmit} from 'redux-form';
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";

export type InitialStateType = typeof initialState

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null as string | null
};

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'DS/AUTH/SET_AUTH_USER_DATA':
        case 'DS/AUTH/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;//()

type ActionsTypes = InferActionsTypes<typeof authActions>

export const authActions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'DS/AUTH/SET_AUTH_USER_DATA', payload:
            {userId, email, login, isAuth}
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'DS/AUTH/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}
    } as const)
}

type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let data = await authAPI.me();

    if (data.resultCode === ResultCodes.Success) {
        let {id, email, login} = data.data;
        dispatch(authActions.setAuthUserData(id, email, login, true))
    }
};

export const logIn = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
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

export const logOut = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logout();

    if (data.resultCode === 0) {

        dispatch(authActions.setAuthUserData(null, null, null, false))
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let data = await securityAPI.getCaptchaUrl();

    dispatch(authActions.getCaptchaUrlSuccess(data.url))
};