import {getAuthUserData} from "./auth-reducer";
import {InferActionsTypes} from "./redux-store";

export type InitialStateType = typeof initialState

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'DS/APP/INITIALIZED_SUCCESS': {
            return {
                ...state,
                initialized: true
            };
        }
        default:
            return state;
    }
};

export default appReducer;

type ActionsTypes = InferActionsTypes<typeof appActions>

export const appActions = {
    initializedSuccess: () => ({type: 'DS/APP/INITIALIZED_SUCCESS'} as const)
}

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
    .then(() => {
        dispatch(appActions.initializedSuccess())
    });
};

