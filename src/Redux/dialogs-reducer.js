const SEND_MESSAGE = 'dialogs/SEND-MESSAGE';

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
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let newMessage = {message: action.messageText, id: 6};
            return {
                ...state,
                messages: [...state.messages, newMessage],
            };
        }
        default:
            return state;
    }
};

export default dialogsReducer;
export const sendMessage = (messageText) => ({type: SEND_MESSAGE, messageText});