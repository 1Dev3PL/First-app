import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, savePhoto, saveProfile, updateUserStatus} from "../../Redux/profile-reducer";
import {withRouter, RouteComponentProps} from "react-router-dom";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import { ProfileType } from '../../types/types';
import {AppStateType} from "../../Redux/redux-store";

type PathParamsType = {
    userId: string
}
type MapStatePropsType = {
    profile: ProfileType | null
    status: string
    myId: number | null
}

type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
    savePhoto: (photo: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType>{
    refreshProfile () {
        let userId: number | null = +this.props.match.params.userId;
        if(!userId) {
            userId = this.props.myId;
            if(!userId) {
                this.props.history.push('/login')
            }
        }
        if(!userId) {
            console.error('ID should exist in URL params or in state ("authorizedUserId")')
        } else {
            this.props.getUserProfile(userId as number);
            this.props.getUserStatus(userId as number)
        }
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType, prevState: MapStatePropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    componentWillUnmount() {}

    render() {
        return (
            <div>
                <Profile {...this.props}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateUserStatus}
                         isOwner={!this.props.match.params.userId}
                         savePhoto={this.props.savePhoto}
                         saveProfile={this.props.saveProfile}/>
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profile.profile,
        status: state.profile.status,
        myId: state.auth.userId,
    }
};

//const { } =

export default compose<React.ComponentType>(
    connect/*<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>*/
    (mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);
