import React from 'react';
import style from './ProfileInfo.module.css';
import userPhoto from '../../../assets/images/userPhoto.png';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
    return (
        <div className={style.info}>
            <img src={!props.profile.photos.large && userPhoto} alt={'userPhoto'}/>
            <h1>{props.profile.fullName}</h1>
            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
        </div>
    )
};

export default ProfileInfo;