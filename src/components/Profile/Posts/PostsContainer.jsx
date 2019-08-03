import React from 'react';
import {addPostActionCreator, updatePostTextActionCreator} from "../../../Redux/profile-reducer";
import Posts from "./Posts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        posts: state.profile.posts,
        newPostText: state.profile.newPostText,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        onPostChange: (text) => {
            let action = updatePostTextActionCreator(text);
            dispatch(action);
        },
        addPost: () => {
            dispatch(addPostActionCreator());
        }
    }
};

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer;