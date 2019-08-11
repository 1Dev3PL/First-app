import React from 'react';
import User from "./User/User";
import * as axios from "axios";

class Users extends React.Component{
    getUsers = () => {
        if (this.props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                this.props.setUsers(response.data.items);
            })
        }
    };

    render() {
        let usersElements = this.props.users
            .map(user => <User id={user.id}
                               name={user.name}
                               smallPhoto={user.photos.small}
                               status={user.status}
                               //location={user.location}
                               followed={user.followed}
                               key={user.id}
                               follow={this.props.follow}
                               unfollow={this.props.unfollow}/>);

        return (
            <div>
                <button onClick={this.getUsers}>get</button>
                {usersElements}
            </div>
        )
    }
}

export default Users;