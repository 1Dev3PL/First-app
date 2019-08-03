import React from 'react';
import User from "./User/User";

const Users = (props) => {
    if (props.users.length === 0) {
        props.setUsers([
            {
            id: 1,
            followed: false,
            fullName: 'M.Avdol',
            status: 'Rip',
            location: {country: 'Egypt', city: 'Jopa'}
        },
            {
                id: 2,
                followed: false,
                fullName: 'N.Kakyoin',
                status: 'Donut',
                location: {country: 'Japan', city: 'Tokyo'}
            },
            {
                id: 3,
                followed: false,
                fullName: 'G.Giorno',
                status: 'Boss',
                location: {country: 'Italy', city: 'Neapol'}
            },
            {
                id: 4,
                followed: false,
                fullName: 'J-P.Polnareff',
                status: 'Turtle',
                location: {country: 'Italy', city: 'Neapol'}
            },
            {
                id: 5,
                followed: true,
                fullName: 'DIO',
                status: 'Typa ymir',
                location: {country: 'Japan', city: 'Tokyo'}
            },
            {
                id: 6,
                followed: false,
                fullName: 'Y.Kira',
                status: 'Killer Queen already touched this status',
                location: {country: 'Japan', city: 'Morio'}
            },
            {
                id: 7,
                followed: true,
                fullName: 'jojo',
                status: 'jojo',
                location: {country: 'jojo', city: 'jojo'}
            },
            {
                id: 8,
                followed: false,
                fullName: 'puk',
                status: 'puk',
                location: {country: 'puk', city: 'puk'}
            }]);
    }
    let usersElements = props.users
        .map(user => <User id={user.id}
                           fullName={user.fullName}
                           status={user.status}
                           location={user.location}
                           followed={user.followed}
                           key={user.id}
                           follow={props.follow}
                           unfollow={props.unfollow}/>);

    return (
        <div>
            {usersElements}
        </div>
    )
};

export default Users;