import React from 'react';
import style from './User.module.css';

const User = (props) => {
    return (
        <div className={style.item}>
            <span>
                <div>
                    <img src='https://labelstech.com/wp-content/uploads/2017/02/47199326-profile-pictures.png'/>
                </div>
                <div>
                    {props.followed
                        ? <button onClick={() => {props.unfollow(props.id)}}>Unfollow</button>
                        : <button onClick={() => {props.follow(props.id)}}>Follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>
                        {props.fullName}
                    </div>
                    <div>
                        {props.status}
                    </div>
                </span>
                <span>
                    <div>
                        {props.location.country}
                    </div>
                    <div>
                        {props.location.city}
                    </div>
                </span>
            </span>
        </div>
    )
};

export default User;