import React from 'react';
import style from './ProfileInfo.module.css';
import userPhoto from '../../../assets/images/userPhoto.png';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
    return (
        <div className={style.info}>
            <img src={!props.profile.photos.large && userPhoto} className={style.picture} alt={'userPhoto'}/>
            <span className={style.nickName}>{props.profile.fullName}</span>
            <div>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
            <div>
                <b>About me</b>: {props.aboutMe ? props.aboutMe : ' '}
            </div>
            <div>
                <b>Looking for a job</b>: {props.lookingForAJob ? 'yes' : 'no'}
            </div>
            {props.lookingForAJob &&
            <div>
                <b>My profesional skills</b>: {props.lookingForAJobDescription}
            </div>}
        </div>
    )
};

export default ProfileInfo;