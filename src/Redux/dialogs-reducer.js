const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';

const dialogsReducer = (state, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {message: state.newMessageText, id: 6};
            state.messages.push(newMessage);
            state.newMessageText = '';
            return state;
        case UPDATE_MESSAGE_TEXT:
            state.newMessageText = action.message;
            return state;
        default:
            return state;
    }
};

export default dialogsReducer();
export const sendMessageActionCreator = () => ({type: SEND_MESSAGE});
export const updateMessageTextActionCreator = (text) => ({type: UPDATE_MESSAGE_TEXT, message: text});