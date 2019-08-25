import React from 'react';
import style from './Header.module.css';
import logo from '../../assets/images/logo.png';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={style.header}>
            <img src={logo} alt='Jopa' />
            <div className={style.loginBlock}>
                {props.isAuth ? props.login : <NavLink to={'/login'} activeClassName={style.activeLink}>Log in</NavLink>}
            </div>
        </header>
    )
};

export default Header;