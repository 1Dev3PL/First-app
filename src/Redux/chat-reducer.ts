import {ChatMessageType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {stopSubmit} from "redux-form";
import {chatAPI} from "../api/chat-api";
import {Dispatch} from "redux";

type InitialStateType = typeof  initialState
type ActionsTypes = InferActionsTypes<typeof chatActions>

let initialState = {
    messages: [] as Array<ChatMessageType>
}

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'DS/CHAT/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            };
        default:
            return state;
    }
}

export default chatReducer

export const chatActions = {
    messagesReceived: (messages: Array<ChatMessageType>) => ({
        type: 'DS/CHAT/MESSAGES_RECEIVED',
        payload: {messages}
    } as const)
}

let _newMessageHandler: ((messages: Array<ChatMessageType>) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if(_newMessageHandler === null) {
        _newMessageHandler = (messages: Array<ChatMessageType>) => {
            dispatch(chatActions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    await chatAPI.subscribe(newMessageHandlerCreator(dispatch))
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    await chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
};

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    await chatAPI.sendMessage(message)
};