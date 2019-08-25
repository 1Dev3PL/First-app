const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const NEXT_PAGE = 'NEXT-PAGE';
const PREVIOUS_PAGE = 'PREVIOUS-PAGE';
const CHANGE_PAGE = 'CHANGE-PAGE';
const SET_USERS = 'SET-USERS';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';

let initialState = {
    users: [],
    pageNumber: 1,
    totalUsersCount: 0,
    pageSize: 5,
    isFetching: false
};

const findUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            };
        case NEXT_PAGE:
            return {
                ...state,
                pageNumber: state.pageNumber + 1
            };
        case PREVIOUS_PAGE:
            return {
                ...state,
                pageNumber: state.pageNumber - 1
            };
        case CHANGE_PAGE:
            return {
                ...state,
                pageNumber: action.pageNumber
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        default:
            return state;
    }
};

export default findUsersReducer;//()
export const follow = (userId) => ({type: FOLLOW, userId});
export const unfollow = (userId) => ({type: UNFOLLOW, userId});
export const nextPage = () => ({type: NEXT_PAGE});
export const previousPage = () => ({type: PREVIOUS_PAGE});
export const changePage = (pageNumber) => ({type: CHANGE_PAGE, pageNumber});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setTotalUsersCount = (totalCount) => ({type: SET_TOTAL_USERS_COUNT, totalCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});