import profileReducer, {addPost, deletePost} from "./profile-reducer";
import React from "react";

let state = {
    posts: [
        {message: 'ZA WARUDO', likesCount: 44, id: 1},
        {message: 'yare yare', likesCount: 1, id: 2},
    ]
};

it('length of posts should be incremented', () => {
    let action = addPost('test text');
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(3);
});

it('new message should be correct', () => {
    let action = addPost('test text');
    let newState = profileReducer(state, action);

    expect(newState.posts[2].message).toBe('test text');
});

it('after deleting length of messages should be decrement', () => {
    let action = deletePost(2);
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(1);
});

