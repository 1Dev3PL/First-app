import React from 'react';
import style from './Header.module.css';

const Header = (props) => {
    return (
        <header className={style.header}>
            <img src='http://st.mycdn.me/res/i/ok_logo.png' alt='Jopa' />
        </header>
    )
};

export default Header;