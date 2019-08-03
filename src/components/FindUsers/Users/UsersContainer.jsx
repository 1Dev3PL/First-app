import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {followActionCreator, setUsersActionCreator, unfollowActionCreator} from "../../../Redux/findusers-reducer";

let mapStateToProps = (state) => {
    return {
        users: state.findUsers.users
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followActionCreator(userId))
        },
        unfollow: (userId) => {
            dispatch(unfollowActionCreator(userId))
        },
        setUsers: (users) => {
            dispatch(setUsersActionCreator(users))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users)