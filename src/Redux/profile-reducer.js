const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';

let initialState = {
    posts: [
        {message: 'ZA WARUDO', likesCount: 44, id: 1},
        {message: 'yare yare', likesCount: 1, id: 2},
    ],
    newPostText: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                message: state.newPostText,
                likesCount: 0,
                id: 5
            };
           return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case UPDATE_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            };
        }
        default:
            return state;
    }
};

export default profileReducer;//()
export const addPostActionCreator = () => ({type: ADD_POST});
export const updatePostTextActionCreator = (text) => ({type: UPDATE_POST_TEXT, newText: text});