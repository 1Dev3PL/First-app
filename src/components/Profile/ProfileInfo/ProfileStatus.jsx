import React from "react";
import style from './ProfileInfo.module.css';

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    };

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    };

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
    };

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    };

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || 'No Status'}</span>
                </div>
                }
                {this.state.editMode &&
                <div onBlur={this.deactivateEditMode}>
                    <input onChange={this.onStatusChange} autoFocus={true} value={this.props.status}/>
                    <button onClick={this.props.updateStatus(this.state.status)}>Save</button>
                </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;