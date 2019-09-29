import React from 'react';
import style from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./Posts/PostsContainer";
import Preloader from "../Common/Preloader/Preloader";

const Profile = (props) => {
    if(!props.profile) {
        return(
            <Preloader/>
        )
    }

    return (
        <div>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}/>
            <PostsContainer />
        </div>
    )
};

export default Profile;