import {AppStateType} from "./redux-store";

export const getProfileSelector = (state: AppStateType) => {
    return(
        state.profile.profile
    )
};

export const getStatusSelector = (state: AppStateType) => {
    return(
        state.profile.status
    )
};

export const getLoginSelector = (state: AppStateType) => {
    return(
        state.auth.login
    )
};