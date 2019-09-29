import React from 'react';
import style from './User.module.css';
import userPhoto from '../../../assets/images/userPhoto.png';
import {NavLink} from 'react-router-dom';

const User = (props) => {
    return (
        <div className={style.item}>
            <div>
                <NavLink to={'/profile/' + props.id}>
                    <img src={props.smallPhoto != null ? props.smallPhoto : userPhoto} alt={'userPicture'}/>
                </NavLink>
            </div>
            <div>
                {props.name}
            </div>
            <div>
                {props.status}
            </div>
            <div>
                {props.followed
                    ? <button disabled={props.followingInProgress
                        .some(id => id === props.id)} onClick={() => {
                        props.unfollow(props.id)
                    }}>Unfollow</button>

                    : <button disabled={props.followingInProgress
                        .some(id => id === props.id)} onClick={() => {
                        props.follow(props.id)
                    }}>Follow</button>}
            </div>
        </div>
    )
};

export default User;