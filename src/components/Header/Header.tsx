import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../Redux/auth-reducer";
import {getIsAuthSelector, getLoginSelector} from "../../Redux/auth-selectors";
import style from "./Header.module.css";
import logo from "../../assets/images/logo.png";
import {NavLink} from "react-router-dom";

const Header: React.FC = () => {
    const isAuth = useSelector(getIsAuthSelector)
    const login = useSelector(getLoginSelector)

    const dispatch = useDispatch()

    return (
        <header className={style.header}>
            <img src={logo} alt='Jopa' />
            <div className={style.loginBlock}>
                {isAuth
                    ? <div>{login} <button onClick={() => dispatch(logOut())}>Log out</button></div>
                    : <NavLink to={'/login'} activeClassName={style.activeLink}>Log in</NavLink>}
            </div>
        </header>
    )
}

export default Header