import React from 'react';
import {connect} from 'react-redux';
import {
    usersActions,
    follow,
    unfollow,
    requestUsers, FilterType
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
    getCurrentPage,
    getPortionSize,
    getUsersFilter
} from "../../Redux/users-selectors";
import {UserType} from "../../types/types";
import {AppStateType} from "../../Redux/redux-store";
import Paginator from "../Common/Paginator/Paginator";
import UsersSearchForm from "./UsersSearchForm";

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    portionSize: number
    isFetching: boolean
    totalUsersCount: number
    followingInProgress: Array<number>
    users: Array<UserType>
    filter: FilterType
}
type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
    changePage: (pageNumber: number) => void
    nextPage: () => void
    previousPage: () => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const {currentPage, pageSize, filter} = this.props
        this.props.getUsers(currentPage, pageSize, filter);
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize, filter} = this.props
        this.props.getUsers(pageNumber, pageSize, filter);
        this.props.changePage(pageNumber);
    };

    onFilterChanged = (filter: FilterType) => {
        const {pageSize} = this.props
        this.props.getUsers(1, pageSize, filter);

    };

    onNextButtonPressed = () => {
        const {currentPage, pageSize, filter} = this.props
        this.props.nextPage();
        this.props.getUsers(currentPage + 1, pageSize, filter);
    };

    onPreviousButtonPressed = () => {
        const {currentPage, pageSize, filter} = this.props
        this.props.previousPage();
        this.props.getUsers(currentPage - 1, pageSize, filter);
    };

    render() {
        return (
            <div>
                <UsersSearchForm onFilterChanged={this.onFilterChanged}/>
                {this.props.isFetching ? <Preloader/> :
                    <Users users={this.props.users}
                           followingInProgress={this.props.followingInProgress}
                           follow={this.props.follow}
                           unfollow={this.props.unfollow}
                           />}

                <Paginator totalItemsCount={this.props.totalUsersCount}
                           pageSize={this.props.pageSize}
                           portionSize={this.props.portionSize}
                           currentPage={this.props.currentPage}
                           onPreviousButtonPressed={this.onPreviousButtonPressed}
                           onNextButtonPressed={this.onNextButtonPressed}
                           onPageChanged={this.onPageChanged}/>
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        portionSize: getPortionSize(state),
        totalUsersCount: getTotalUsersCount(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state)
    };
};
//Здесь чёт стрёмно нужно разузнать получше
const {nextPage, previousPage, changePage} = usersActions;

export default compose<React.ComponentType>(
    //TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultRootState
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
        follow, unfollow, nextPage, previousPage, changePage, getUsers: requestUsers
    }),
    withAuthRedirect
)(UsersContainer);