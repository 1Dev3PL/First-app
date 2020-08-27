import {AppStateType} from "./redux-store";

export const getFriendsSelector = (state: AppStateType) => {
    return(
        state.dialogs.friends
    )
};

export const getMessagesSelector = (state: AppStateType) => {
    return(
        state.dialogs.messages
    )
};