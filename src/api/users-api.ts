import {instance} from "./api";
import {UserType, ResponseType} from "../types/types";

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