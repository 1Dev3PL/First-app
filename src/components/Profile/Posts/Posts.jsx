import React from 'react';
import style from './Posts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../Common/FormsControls/FormsControls";

const maxLength50 = maxLengthCreator(50);

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Write post'}
                       name={'postText'}
                       component={Textarea} validate={[required, maxLength50]}/>
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
};

const AddPostReduxForm = reduxForm({form: 'addPost'})(AddPostForm);

const Posts = React.memo(props => {
    let postsElements = props.posts
        .map(post => <Post message={post.message} likes={post.likesCount} key={post.id} id={post.id}/>);

    let onAddPost = (values) => {
        props.addPost(values.postText);
    };

    return (
        <div className={style.posts}>
            <AddPostReduxForm onSubmit={onAddPost}/>
            <div>
                {postsElements}
            </div>
        </div>
    )
});


export default Posts;