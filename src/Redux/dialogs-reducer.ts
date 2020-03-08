const SEND_MESSAGE = 'dialogs/SEND-MESSAGE';

type DialogType = {
    id: number;
    name: string;
}
type MessageType = {
    id: number;
    message: string;
}

let initialState = {
    friends: [
        {name: 'Ivan', id: 1},
        {name: 'Dima', id: 2},
        {name: 'Lena', id: 3},
        {name: 'Ilia', id: 4},
    ] as Array<DialogType>,
    messages: [
        {message: 'Hello', id: 1},
        {message: 'Lol', id: 2},
        {message: 'Sample Text', id: 3},
        {message: 'Message)))..0)', id: 4},
    ] as Array<MessageType>,
};

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
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

type sendMessageActionType = {
    type: typeof SEND_MESSAGE;
    messageText: string;
}

export const sendMessage = (messageText: string): sendMessageActionType => ({type: SEND_MESSAGE, messageText});