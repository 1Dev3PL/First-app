import {profileActions} from "../../../Redux/profile-reducer";
import Posts from "./Posts";
import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/redux-store";
import {PostType} from "../../../types/types";

export type MapStatePropsType = {
    posts: Array<PostType>
}
export type MapDispatchPropsType = {
    addPost: (postText: string) => void
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profile.posts
    }
};

const {addPost} = profileActions

const PostsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>
(mapStateToProps, {addPost})(Posts);

export default PostsContainer;