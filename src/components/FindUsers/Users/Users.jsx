import React from 'react';
import User from './User/User';
import style from './Users.module.css';

let Users = (props) => {
    let usersElements = props.users
        .map(user => <User id={user.id}
                           name={user.name}
                           smallPhoto={user.photos.small}
                           status={user.status}
            //location={user.location}
                           followed={user.followed}
                           key={user.id}
                           follow={props.follow}
                           unfollow={props.unfollow}/>);

    let pages = [];
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div>
                {usersElements}
            </div>
            <div>
                <div className={style.pageNavigation}>
                    <button onClick={() => {props.onPreviousButtonPressed()}}>Туда</button>
                    <span>Page {props.pageNumber}</span>
                    <button onClick={() => {props.onNextButtonPressed()}}>Сюда</button>
                </div>
                <div className={style.pageNavigation}>
                    {pages.map(page => {
                        return (
                            <span onClick={() => {props.onPageChanged(page)}}
                                  className={props.pageNumber === page ? style.selectedPage : style.page}>
                                    {page + ' '}
                                </span>)
                    })}
                </div>
            </div>
        </div>
    )
};

export default Users;