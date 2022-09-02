import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {stopSubmit} from "redux-form";
import {chatAPI, ChatMessageAPIType, StatusType} from "../api/chat-api";
import {Dispatch} from "redux";
import {v1} from 'uuid'

type InitialStateType = typeof  initialState
type ActionsTypes = InferActionsTypes<typeof chatActions>
type ChatMessageType = ChatMessageAPIType & {id: string}

let initialState = {
    messages: [] as Array<ChatMessageType>,
    status: 'pending' as StatusType
}

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'DS/CHAT/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))]
                    .filter((m, index, array) => {
                    return index >= (array.length - 100)
                })
            };
        case 'DS/CHAT/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            };
        default:
            return state;
    }
}

export default chatReducer

export const chatActions = {
    messagesReceived: (messages: Array<ChatMessageAPIType>) => ({
        type: 'DS/CHAT/MESSAGES_RECEIVED',
        payload: {messages}
    } as const),
    statusChanged: (status: StatusType) => ({
        type: 'DS/CHAT/STATUS_CHANGED',
        payload: {status}
    } as const)
}

let _newMessageHandler: ((messages: Array<ChatMessageAPIType>) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if(_newMessageHandler === null) {
        _newMessageHandler = (messages: Array<ChatMessageAPIType>) => {
            dispatch(chatActions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if(_statusChangedHandler === null) {
        _statusChangedHandler = (status: StatusType) => {
            dispatch(chatActions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
};

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
};