import React from 'react';
import style from './Header.module.css';
import logo from '../../assets/images/logo.png';
import {NavLink} from "react-router-dom";
import {PropsType} from "./HeaderContainer";

const Header: React.FC<PropsType> = (props) => {
    return (
        <header className={style.header}>
            <img src={logo} alt='Jopa' />
            <div className={style.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={'/login'} activeClassName={style.activeLink}>Log in</NavLink>}
            </div>
        </header>
    )
};

export default Header;