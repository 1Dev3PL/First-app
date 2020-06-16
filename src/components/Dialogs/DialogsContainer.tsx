import React from 'react';
import {connect} from "react-redux";
import {dialogsActions} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {FriendType, MessageType} from "../../types/types";
import {AppStateType} from "../../Redux/redux-store";

type MapStatePropsType = {
    friends: Array<FriendType>
    messages: Array<MessageType>
}
type MapDispatchPropsType = {
    sendMessage: (messageText: string) => void
}
type OwnPropsType = {

}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class DialogsContainer extends React.Component<PropsType> {
    render() {
        return (
            <div>
                <Dialogs friends={this.props.friends}
                         messages={this.props.messages}
                         sendMessage={this.props.sendMessage}/>
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        friends: state.dialogs.friends,
        messages: state.dialogs.messages,
    }
};

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
    (mapStateToProps, {sendMessage: dialogsActions.sendMessage}),
    withAuthRedirect
)(DialogsContainer);