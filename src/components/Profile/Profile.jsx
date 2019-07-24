import React from 'react';
import style from './Profile.module.css';
import Posts from "./Posts/Posts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo />
            <Posts posts={props.ProfileState.posts}
                   newPostText={props.ProfileState.newPostText}
                   dispatch={props.dispatch}/>
        </div>
    )
};

export default Profile;