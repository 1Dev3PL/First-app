import {getAuthUserData} from "./auth-reducer";
import {InferActionsTypes} from "./redux-store";

export type InitialStateType = {
    initialized: boolean;
};

let initialState: InitialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS': {
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

type ActionsType = InferActionsTypes<typeof appActions>

export const appActions = {
    initializedSuccess: () => ({type: 'INITIALIZED_SUCCESS'} as const)
}


export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
    .then(() => {
        dispatch(appActions.initializedSuccess())
    });
};

