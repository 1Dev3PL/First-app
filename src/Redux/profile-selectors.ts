import {AppStateType} from "./redux-store";

export const selectProfile = (state: AppStateType) => {
    return(
        state.profile.profile
    )
};

export const selectProfilePhoto = (state: AppStateType) => {
    return(
        state.profile.profile?.photos.small
    )
};

export const selectStatus = (state: AppStateType) => {
    return(
        state.profile.status
    )
};
