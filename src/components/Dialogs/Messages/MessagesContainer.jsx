import React from 'react';
import {sendMessageActionCreator, updateMessageTextActionCreator} from "../../../Redux/dialogs-reducer";
import Messages from "./Messages";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        messages: state.dialogs.messages,
        newMessageText: state.dialogs.newMessageText
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => {
            dispatch(sendMessageActionCreator());
        },
        onMessageChange: (text) => {
            let action = updateMessageTextActionCreator(text);
            dispatch(action);
        }
    }
};

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages);

export default MessagesContainer;