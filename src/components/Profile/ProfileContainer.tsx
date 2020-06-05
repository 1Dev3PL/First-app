import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, savePhoto, saveProfile, updateUserStatus} from "../../Redux/profile-reducer";
import {withRouter} from "react-router-dom";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import { ProfileType } from '../../types/types';
import {AppStateType} from "../../Redux/redux-store";

type MapStatePropsType = {
    profile: ProfileType | null
    status: string
    myId: number | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
    savePhoto: (photo: any) => void
    saveProfile: (profile: ProfileType) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<PropsType>{
    refreshProfile () {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = this.props.myId;
            if(!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType, prevState: MapStatePropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

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
        isAuth: state.auth.isAuth
    }
};

const { } =

export default compose(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);
