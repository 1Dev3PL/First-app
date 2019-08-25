import React from "react";
import style from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader";

const ProfileInfo = (props) => {
    if(!props.profile) {
        return(
            <Preloader/>
        )
    }
    return (

        <div>
            <div className={style.picture}>
                <img src='https://static.makeuseof.com/wp-content/uploads/2016/09/Windows-White-Wallpaper-Featured-670x335.jpg' alt='avatar' />
            </div>
            <div className={style.info}>
                <img src={props.profile.photos.large}/>
                ava and desc
            </div>
        </div>
    )
};

export default ProfileInfo;
