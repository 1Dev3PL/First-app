import React from 'react';
import {connect} from 'react-redux';
import {
    changePage,
    follow,
    nextPage,
    previousPage,
    unfollow,
    toggleFollowingProgress,
    requestUsers
} from '../../Redux/users-reducer';
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getUsers,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getCurrentPage
} from "../../Redux/users-selectors";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.requestUsers(pageNumber, this.props.pageSize);
        this.props.changePage(pageNumber);
    };

    onNextButtonPressed = () => {
        this.props.nextPage();
        this.props.requestUsers(this.props.currentPage + 1, this.props.pageSize);
    };

    onPreviousButtonPressed = () => {
        this.props.previousPage();
        this.props.requestUsers(this.props.currentPage - 1, this.props.pageSize);
    };

    render() {
        return (
            <div>
                {this.props.isFetching ? <Preloader/> : null}
                <Users users={this.props.users}
                       totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       followingInProgress={this.props.followingInProgress}
                       onNextButtonPressed={this.onNextButtonPressed}
                       onPreviousButtonPressed={this.onPreviousButtonPressed}
                       onPageChanged={this.onPageChanged}
                       toggleFollowingProgress={this.props.toggleFollowingProgress}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    };
};

export default compose(
    connect(mapStateToProps, {
        follow, unfollow, nextPage, previousPage, changePage, toggleFollowingProgress, requestUsers
    }),
    withAuthRedirect
)(UsersContainer);