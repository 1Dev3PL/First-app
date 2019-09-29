import React from 'react';
import {addPost} from "../../../Redux/profile-reducer";
import Posts from "./Posts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        posts: state.profile.posts,
        newPostText: state.profile.newPostText,
    }
};

const PostsContainer = connect(mapStateToProps, {addPost})(Posts);

export default PostsContainer;