import {ProfileType, ResponseType} from "../types/types";
import {instance} from "./api";

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