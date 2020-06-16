import React from 'react';
import style from './Post.module.css';
import userPhoto from '../../../../assets/images/userPhoto.png';

type PropsType = {
    message: string
    likes: number
    id: number
}

const Post: React.FC<PropsType> = (props) => {
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