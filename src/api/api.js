import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': '10939f88-a91c-4500-a1b2-5c79cc6cb8c4'}
});

export const getUsers = (pageNumber = 1, pageSize = 5) => {
    return (
        instance.get(`users?page=${pageNumber}&count=${pageSize}`)
            .then(response => response.data)
    )
};

export const follow = (id) => {
    return (
        instance.post(`follow/${id}`, {})
            .then(response => response.data)
    )
};

export const unfollow = (id) => {
    return (
        instance.delete(`follow/${id}`, {})
            .then(response => response.data)
    )
};



