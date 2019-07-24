import React from 'react';
import style from './Post.module.css';

const Post = (props) => {
    return (
            <div className={style.item}>
                <img src='https://labelstech.com/wp-content/uploads/2017/02/47199326-profile-pictures.png'/>
                {props.message}
                <div>
                    {props.likes} like
                </div>
            </div>
    )
};

export default Post;