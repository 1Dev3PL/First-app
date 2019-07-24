import React from "react";
import style from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
    return (
        <div>
            <div>
                <img src='https://static.makeuseof.com/wp-content/uploads/2016/09/Windows-White-Wallpaper-Featured-670x335.jpg' alt='avatar' />
            </div>
            <div className={style.info}>
                ava and desc
            </div>
        </div>
    )
};

export default ProfileInfo;
