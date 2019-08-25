import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import findUsersReducer from "./findusers-reducer";
import authReducer from "./auth-reducer";

let reducers = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    findUsers: findUsersReducer,
    auth: authReducer
});

let store = createStore(reducers);

export default store;