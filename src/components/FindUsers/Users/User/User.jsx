import React from 'react';
import style from './User.module.css';
import userPhoto from '../../../../assets/images/userPhoto.png';

const User = (props) => {
    return (
        <div className={style.item}>
            <span>
                <div>
                    <img src={props.smallPhoto != null ? props.smallPhoto : userPhoto}/>
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
                        {props.name}
                    </div>
                    <div>
                        {props.status}
                    </div>
                </span>
                <span>
                    <div>
                        {'props.location.country'}
                    </div>
                    <div>
                        {'props.location.city'}
                    </div>
                </span>
            </span>
        </div>
    )
};

export default User;