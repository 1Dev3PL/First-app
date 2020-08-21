import { FriendType, MessageType } from "../types/types";
import {InferActionsTypes} from "./redux-store";

let initialState = {
    friends: [
        {name: 'Ivan', id: 1},
        {name: 'Dima', id: 2},
        {name: 'Lena', id: 3},
        {name: 'Ilia', id: 4},
    ] as Array<FriendType>,
    messages: [
        {message: 'Hello', id: 1},
        {message: 'Lol', id: 2},
        {message: 'Sample Text', id: 3},
        {message: 'Message)))..0)', id: 4},
    ] as Array<MessageType>,
};

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'DS/DIALOGS/SEND_MESSAGE': {
            let newMessage = {message: action.messageText, id: 5};
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

type ActionsType = InferActionsTypes<typeof dialogsActions>

export const dialogsActions = {
    sendMessage: (messageText: string) => ({type: 'DS/DIALOGS/SEND_MESSAGE', messageText} as const)
}
