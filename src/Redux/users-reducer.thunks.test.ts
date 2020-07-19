import {follow, unfollow, usersActions} from "./users-reducer";
import {APIResponseType, ResultCodes} from "../api/api";
import {usersAPI} from "../api/users-api";
//Сделать фейковым объект, возращаемый из ../api/users-api
jest.mock('../api/users-api')
//Тепер usersAPI - фейковый
//Записываем usersAPI в usersAPIMock и говорим TS-у что это мокнутый usersAPI
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: APIResponseType = {
    resultCode: ResultCodes.Success,
    messages: [],
    data: {}
}

//Фейковые dispatch и getState
const dispatchMock = jest.fn()
const getStateMock = jest.fn()

//Отчистка перед каждым тестом
beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    usersAPIMock.follow.mockClear()
    usersAPIMock.unfollow.mockClear()
})

//Если в API будет запрос follow, то будет возвращаться result
usersAPIMock.follow.mockReturnValue(Promise.resolve(result))
usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

test('Follow success thunk test', async () => {
    const thunk = follow(1)

    await thunk(dispatchMock, getStateMock, {})
    //Проверка, сколько раз вызывался dispatch
    expect(dispatchMock).toBeCalledTimes(3)
    //Проверка, какой вызов был с каким объектом
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.toggleFollowingProgress(false, 1))
})

test('Unfollow success thunk test', async () => {
    const thunk = unfollow(3)

    await thunk(dispatchMock, getStateMock, {})
    //Проверка, сколько раз вызывался dispatch
    expect(dispatchMock).toBeCalledTimes(3)
    //Проверка, какой вызов был с каким объектом
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleFollowingProgress(true, 3))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.unfollowSuccess(3))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.toggleFollowingProgress(false, 3))
})