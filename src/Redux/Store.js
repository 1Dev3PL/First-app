import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'

let store = {
    _state: {
        profile: {
            posts: [
                {message: 'ZA WARUDO', likesCount: 44, id: 1},
                {message: 'yare yare', likesCount: 1, id: 2},
            ],
            newPostText: ''
        },
        dialogs: {
            friends: [
                {name: 'Ivan', id: 1},
                {name: 'Dima', id: 2},
                {name: 'Lena', id: 3},
                {name: 'Ilia', id: 4},
                {name: 'DIO', id: 5},
            ],
            messages: [
                {message: 'Priva', id: 1},
                {message: 'Lel', id: 2},
                {message: 'JoooooooooJo', id: 3},
                {message: 'Za Warudo', id: 4},
                {message: 'Kokoko', id: 5},
            ],
            newMessageText: ''
        }
    },

    _callSubscriber() {},

    getState() {
        return this._state;
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profile = profileReducer(this._state.profile, action);
        this._state.dialogs = dialogsReducer(this._state.dialogs, action);

        this._callSubscriber(this._state);
    }
};

export default store;