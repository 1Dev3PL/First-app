import React from 'react';
import style from './Posts.module.css';
import Post from "./Post/Post";

const Posts = (props) => {
    let postsElements = props.posts
        .map( post => <Post message={post.message} likes={post.likesCount} key={post.id} id={post.id}/>);

    let textArea = React.createRef();

    let onAddPost = () => {
        props.addPost();
    };

    let onPostChange = () => {
        let text = textArea.current.value;
        props.onPostChange(text);
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
                <button onClick={onAddPost}>Add Post</button>
            </div>
            {postsElements}
        </div>
    )
};

export default Posts;