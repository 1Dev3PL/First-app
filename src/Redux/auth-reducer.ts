import {ResultCodeForCaptcha, ResultCodes, securityAPI} from '../api/api';
import {stopSubmit} from 'redux-form';
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {authAPI} from "../api/auth-api";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null as string | null
};

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_AUTH_USER_DATA':
        case 'GET_CAPTCHA_URL_SUCCESS':
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
        type: 'SET_AUTH_USER_DATA', payload:
            {userId, email, login, isAuth}
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}
    } as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let data = await authAPI.me();

    if (data.resultCode === ResultCodes.Success) {
        let {id, email, login} = data.data;
        dispatch(authActions.setAuthUserData(id, email, login, true))
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
        dispatch(authActions.setAuthUserData(null, null, null, false))
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let response = await securityAPI.getCaptchaUrl();

    dispatch(authActions.getCaptchaUrlSuccess(response.data.url))
};