import usersReducer, {InitialStateType, usersActions} from "./users-reducer";

let state: InitialStateType

//Перезаписывает state перед каждым тестом
beforeEach(() => {
    state = {
        users: [
            {id: 0, name: 'First User', followed: false, photos: {small: null, large: null}, status: 'First status'},
            {id: 1, name: 'Second User', followed: false, photos: {small: null, large: null}, status: 'Second status'},
            {id: 2, name: 'Third User', followed: true, photos: {small: null, large: null}, status: 'Third status'},
            {id: 3, name: 'Fourth User', followed: true, photos: {small: null, large: null}, status: 'Fourth status'}
        ],
        currentPage: 1,
        totalUsersCount: 0,
        pageSize: 10,
        isFetching: false,
        followingInProgress: [] as Array<number> //array of userId's
    }
})

test('Second User follow success', () => {
    const newState = usersReducer(state, usersActions.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test('Fourth User unfollow success', () => {
    const newState = usersReducer(state, usersActions.unfollowSuccess(3))

    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})