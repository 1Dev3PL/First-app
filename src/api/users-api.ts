import {instance, GetItemsType, APIResponseType} from "./api";

export const usersAPI = {
    getUsers(pageNumber = 1,
             pageSize = 5,
             term = '',
             friend: null | boolean = null) {
        return instance.get<GetItemsType>(
            `users?page=${pageNumber}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`)
        )
            .then(response => response.data)
    },

    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`, {}).then(response => response.data)
    },

    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`, {}).then(response => response.data) as Promise<APIResponseType>
    },
};