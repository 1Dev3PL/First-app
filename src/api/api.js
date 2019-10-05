import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': '1e5ef08e-dbee-4133-9e6e-82684a105ad9'}
});

export const usersAPI = {
    getUsers(pageNumber = 1, pageSize = 5) {
        return (
            instance.get(`users?page=${pageNumber}&count=${pageSize}`)
        )
    },

    follow(userId) {
        return (
            instance.post(`follow/${userId}`, {})
        )
    },

    unfollow(userId) {
        return (
            instance.delete(`follow/${userId}`, {})
        )
    },
};

export const profileAPI = {
    getUserProfile(userId) {
        return (
            instance.get(`profile/${userId}`))
    },

    getUserStatus(userId) {
        return (
            instance.get(`profile/status/${userId}`))
    },

    updateUserStatus(status) {
        return (
            instance.put(`profile/status`, {status: status}))
    },

    savePhoto(photo) {
        const formData = new FormData();

        formData.append('image', photo);
        return (
            instance.put(`profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }))
    },

    saveProfile(profile) {
        return (
            instance.put(`profile`, profile))
    }
};

export const authAPI = {
    me() {
        return (
            instance.get(`auth/me`)
        )
    },

    login(email, password, rememberMe = false, captcha = null) {
        return (
            instance.post(`auth/login`, {email, password, rememberMe, captcha})
        )
    },

    logout() {
        return (
            instance.delete(`auth/login`)
        )
    }
};

export const securityAPI = {
    getCaptchaUrl() {
        return (
            instance.get(`security/get-captcha-url`)
        )
    }
};



