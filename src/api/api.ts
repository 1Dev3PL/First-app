import axios from "axios";
import {ProfileType, UserType} from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': '1e5ef08e-dbee-4133-9e6e-82684a105ad9'}
});

export enum ResultCodes {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

type ResponseType = {
    resultCode: ResultCodes
    messages: Array<string>
    data: {}
}

type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error?: string
}

export const usersAPI = {
    getUsers(pageNumber = 1, pageSize = 5) {
        return instance.get<GetUsersResponseType>(`users?page=${pageNumber}&count=${pageSize}`).then(response => response.data)
    },

    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`, {}).then(response => response.data)
    },

    unfollow(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`, {}).then(response => response.data)
    },
};

export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(response => response.data)
    },

    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(response => response.data)
    },

    updateUserStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, {status: status}).then(response => response.data)
    },

    savePhoto(photo: any) {
        const formData = new FormData();

        formData.append('image', photo);
        return (
            instance.put(`profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })).then(response => response.data)
    },

    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile)
    }
};

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
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha}).then(response => response.data)
    },

    logout() {
        return instance.delete<LogoutResponseType>(`auth/login`).then(response => response.data)
    }
};

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
};