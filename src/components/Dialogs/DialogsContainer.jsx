import React from 'react';
import {connect} from "react-redux";
import {sendMessage} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class DialogsContainer extends React.Component {
    render() {
        return (
            <div>
                <Dialogs isAuth={this.props.isAuth}
                         friends={this.props.friends}
                         messages={this.props.messages}
                         sendMessage={this.props.sendMessage}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        friends: state.dialogs.friends,
        messages: state.dialogs.messages,
        isAuth: state.auth.isAuth
    }
};

export default compose(
    connect(mapStateToProps, {sendMessage}),
    withAuthRedirect
)(DialogsContainer);
