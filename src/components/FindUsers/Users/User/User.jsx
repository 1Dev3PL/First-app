import React from 'react';
import style from './User.module.css';
import userPhoto from '../../../../assets/images/userPhoto.png';
import {NavLink} from 'react-router-dom';
import * as axios from 'axios';
import {follow, unfollow} from "../../../../api/api";

const User = (props) => {
    return (
        <div className={style.item}>
            <span>
                <div>
                    <NavLink to={'/profile/' + props.id}>
                         <img src={props.smallPhoto != null ? props.smallPhoto : userPhoto}/>
                    </NavLink>
                </div>
                <div>
                    {props.followed
                        ? <button onClick={() => {
                            unfollow(props.id)
                                .then(data => {
                                    if (data.resultCode == 0) {
                                        props.unfollow(props.id)
                                    }
                                })
                        }}>Unfollow</button>

                        : <button onClick={() => {
                            follow(props.id)
                                .then(data => {
                                    if (data.resultCode == 0) {
                                        props.follow(props.id)
                                    }
                                });
                        }}>Follow</button>}
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