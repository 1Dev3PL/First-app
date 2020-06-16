import React from 'react';
import preloader from '../../../assets/images/preloader.gif';
import style from "./Preloader.module.css";

const Preloader: React.FC = () => {
    return (
        <div>
            <img className={style.preloader} src={preloader} alt={'loading...'}/>
        </div>
    )
};

export default Preloader;