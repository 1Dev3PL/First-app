import React from 'react';
import style from './Posts.module.css';
import Post from "./Post/Post";
import AddPostReduxForm, { NewPostFormValuesType } from "./AddPostForm/AddPostForm";
import {MapDispatchPropsType, MapStatePropsType} from "./PostsContainer";
import AddPostNewForm from "./AddPostForm/AddPostNewForm";

type PropsType = MapStatePropsType & MapDispatchPropsType

const Posts: React.FC<PropsType> = (props) => {
    let postsElements = props.posts
        .map(post => <Post message={post.message} likes={post.likesCount} key={post.id} id={post.id}/>);

    let onAddPost = (values: NewPostFormValuesType) => {
        props.addPost(values.postText);
    };

    return (
        <div className={style.posts}>
            <AddPostNewForm addPost={props.addPost}/>
           {/* <AddPostReduxForm />*/}
            <div>
                {postsElements}
            </div>
        </div>
    )
}

const PostsMemorized = React.memo(Posts);

export default PostsMemorized