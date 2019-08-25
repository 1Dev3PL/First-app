import React from 'react';
import {connect} from 'react-redux';
import {
    changePage,
    follow,
    nextPage,
    previousPage,
    setTotalUsersCount,
    setUsers,
    unfollow,
    toggleIsFetching
} from '../../../Redux/findusers-reducer';
import * as axios from 'axios';
import Users from './Users';
import Preloader from '../../Common/Preloader';
import {getUsers} from '../../../api/api';

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        getUsers(this.props.pageNumber, this.props.pageSize)
            .then(data => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items);
            this.props.setTotalUsersCount(data.totalCount);
        })
    }

    onPageChanged = (pageNumber) => {
        this.props.changePage(pageNumber);
        this.props.toggleIsFetching(true);
        getUsers(pageNumber, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
            })
    };

    onNextButtonPressed = () => {
        this.props.nextPage();
        this.props.toggleIsFetching(true);
        getUsers(this.props.pageNumber + 1, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
            })
    };

    onPreviousButtonPressed = () => {
        this.props.previousPage();
        this.props.toggleIsFetching(true);
        getUsers(this.props.pageNumber - 1, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
            })
    };

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users users={this.props.users}
                       totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       pageNumber={this.props.pageNumber}
                       onNextButtonPressed={this.onNextButtonPressed}
                       onPreviousButtonPressed={this.onPreviousButtonPressed}
                       onPageChanged={this.onPageChanged}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}/>
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.findUsers.users,
        pageNumber: state.findUsers.pageNumber,
        pageSize: state.findUsers.pageSize,
        totalUsersCount: state.findUsers.totalUsersCount,
        isFetching: state.findUsers.isFetching
    };
};

export default connect(mapStateToProps, {
    follow,
    unfollow,
    nextPage,
    previousPage,
    changePage,
    setUsers,
    setTotalUsersCount,
    toggleIsFetching
})(UsersContainer)