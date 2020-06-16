import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../Redux/redux-store";

type MapStatePropsType = {
    isAuth: boolean
}

let mapStateToPropsForRedirect = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
};

function withAuthRedirect<WrappedComponentProps>(WrappedComponent: React.ComponentType<WrappedComponentProps>) {
    const RedirectComponent: React.FC<MapStatePropsType> = (props) => {
        let {isAuth, ...restProps} = props

        if (!isAuth) {
            return (
                <Redirect to={'/login'}/>
            )
        }
        return (
            <WrappedComponent {...restProps as WrappedComponentProps}/>
        )
    };

    return connect<MapStatePropsType, {}, WrappedComponentProps, AppStateType>
    (mapStateToPropsForRedirect)(RedirectComponent);
}

export default withAuthRedirect;