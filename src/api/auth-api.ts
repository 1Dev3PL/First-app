import {instance, ResultCodeForCaptcha, ResultCodes} from "./api";

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodes
    messages: Array<string>
}
type LoginResponseType = {
    resultCode: ResultCodes | ResultCodeForCaptcha
    messages: Array<string>
    data: {
        userId: number
    }
}
type LogoutResponseType = {
    resultCode: ResultCodes
    messages: Array<string>
    data: {}
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(response => response.data)
    },

    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(response => response.data)
    },

    logout() {
        return instance.delete<LogoutResponseType>(`auth/login`).then(response => response.data)
    }
};