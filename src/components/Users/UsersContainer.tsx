import React from 'react';
import {connect} from 'react-redux';
import {
    changePage,
    follow,
    nextPage,
    previousPage,
    unfollow,
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
import {UserType} from "../../types/types";
import {AppStateType} from "../../Redux/redux-store";

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    followingInProgress: Array<number>
    users: Array<UserType>
}
type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number) => void
    changePage: (pageNumber: number) => void
    nextPage: () => void
    previousPage: () => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}
type OwnPropsType = {
    title: string
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
        this.props.changePage(pageNumber);
    };

    onNextButtonPressed = () => {
        this.props.nextPage();
        this.props.getUsers(this.props.currentPage + 1, this.props.pageSize);
    };

    onPreviousButtonPressed = () => {
        this.props.previousPage();
        this.props.getUsers(this.props.currentPage - 1, this.props.pageSize);
    };

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                {this.props.isFetching ? <Preloader/> : null}
                <Users users={this.props.users}
                       totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       followingInProgress={this.props.followingInProgress}
                       onNextButtonPressed={this.onNextButtonPressed}
                       onPreviousButtonPressed={this.onPreviousButtonPressed}
                       onPageChanged={this.onPageChanged}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}/>
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
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
    //TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultRootState
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        follow, unfollow, nextPage, previousPage, changePage, getUsers: requestUsers
    }),
    withAuthRedirect
)(UsersContainer);