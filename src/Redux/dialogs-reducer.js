const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let newMessage = {message: state.newMessageText, id: 6};
            return {
                ...state,
                messages: [...state.messages, newMessage],
                newMessageText: ''
            };
        }
        case UPDATE_MESSAGE_TEXT: {
            return {
                ...state,
                newMessageText: action.message
            };
        }
        default:
            return state;
    }
};

export default dialogsReducer;
export const sendMessageActionCreator = () => ({type: SEND_MESSAGE});
export const updateMessageTextActionCreator = (text) => ({type: UPDATE_MESSAGE_TEXT, message: text});