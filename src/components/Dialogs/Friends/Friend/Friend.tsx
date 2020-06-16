import React from 'react';
import style from './Friend.module.css';
import {NavLink} from "react-router-dom";

type PropsType = {
    name: string
    id: number
}

const Friend: React.FC<PropsType> = (props) => {
    return (
        <div className={style.friend}>
            <NavLink to={'/dialogs/' + props.id} activeClassName={style.activeLink}>{props.name}</NavLink>
        </div>
    )
};

export default Friend;