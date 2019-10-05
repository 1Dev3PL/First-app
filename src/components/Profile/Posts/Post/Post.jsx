import React from 'react';
import style from './Post.module.css';
import userPhoto from '../../../../assets/images/userPhoto.png';

const Post = (props) => {
    return (
            <div className={style.item}>
                <img src={userPhoto} alt={'userPhoto'}/>
                {props.message}
                <div>
                    {props.likes} like
                </div>
            </div>
    )
};

export default Post;