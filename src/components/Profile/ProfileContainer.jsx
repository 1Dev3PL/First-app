import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, updateUserStatus} from "../../Redux/profile-reducer";
import {withRouter} from "react-router-dom";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component{
    componentDidMount() {
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

    render() {
        return (
            <div>
                <Profile {...this.props}
                         profie={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateUserStatus}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profile.profile,
        status: state.profile.status,
        myId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
};

export default compose(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);
