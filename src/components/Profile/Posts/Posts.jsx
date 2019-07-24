import React from 'react';
import style from './Posts.module.css';
import Post from "./Post/Post";
import {addPostActionCreator, updatePostTextActionCreator} from "../../../Redux/profile-reducer";

const Posts = (props) => {

    let postsElements = props.posts
        .map( post => <Post message={post.message} likes={post.likesCount} id={post.id}/>);

    let textArea = React.createRef();

    let addPost = () => {
        if (props.newPostText) {
            props.dispatch(addPostActionCreator());
        }
    };

    let onPostChange = () => {
        let text = textArea.current.value;
        props.dispatch(updatePostTextActionCreator(text));
    };

    return (
        <div className={style.posts}>
            <div>
                <textarea ref={textArea}
                          value={props.newPostText}
                          onChange={onPostChange}
                          placeholder='Write post'/>
            </div>
            <div>
                <button onClick={addPost}>Add Post</button>
            </div>
            {postsElements}
        </div>
    )
};

export default Posts;