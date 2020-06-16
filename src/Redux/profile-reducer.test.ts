import profileReducer, {profileActions} from "./profile-reducer";

let state = {
    posts: [
        {message: 'ZA WARUDO', likesCount: 44, id: 1},
        {message: 'yare yare', likesCount: 1, id: 2},
    ],
    profile: null,
    status: ''
};

it('length of posts should be incremented', () => {
    let action = profileActions.addPost('test text');
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(3);
});

it('new message should be correct', () => {
    let action = profileActions.addPost('test text');
    let newState = profileReducer(state, action);

    expect(newState.posts[2].message).toBe('test text');
});

it('after deleting length of messages should be decrement', () => {
    let action = profileActions.deletePost(2);
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(1);
});

