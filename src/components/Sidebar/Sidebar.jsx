import React from 'react';
import style from './Sidebar.module.css';
import {NavLink} from 'react-router-dom';

const Sidebar = (props) => {
    return (
    <nav className={style.sidebar}>
        <div className={style.item} >
            <NavLink to='/profile' activeClassName={style.activeLink}>Profile</NavLink>
        </div>
        <div className={style.item}>
            <NavLink to='/dialogs' activeClassName={style.activeLink}>Dialogs</NavLink>
        </div>
        <div className={style.item}>
            <NavLink to='/news' activeClassName={style.activeLink}>News</NavLink>
        </div>
        <div className={style.item}>
            <NavLink to='/users' activeClassName={style.activeLink}>Users</NavLink>
        </div>
        <div className={style.item}>
            <NavLink to='/music' activeClassName={style.activeLink}>Music</NavLink>
        </div>
        <div className={style.item}>
            <NavLink to='/settings' activeClassName={style.activeLink}>Settings</NavLink>
        </div>
    </nav>
    )
};

export default Sidebar;