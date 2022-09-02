import React from 'react';
import style from './Posts.module.css';
import Post from "./Post/Post";
import {MapDispatchPropsType, MapStatePropsType} from "./PostsContainer";
import AddPostForm from "./AddPostForm/AddPostForm";

type PropsType = MapStatePropsType & MapDispatchPropsType

const Posts: React.FC<PropsType> = (props) => {
    let postsElements = props.posts
        .map(post => <Post message={post.message} likes={post.likesCount} key={post.id} id={post.id}/>);

    return (
        <div className={style.posts}>
            <AddPostForm addPost={props.addPost}/>
            <div>
                {postsElements}
            </div>
        </div>
    )
}

const PostsMemorized = React.memo(Posts);

export default PostsMemorized