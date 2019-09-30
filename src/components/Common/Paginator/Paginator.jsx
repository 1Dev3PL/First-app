import React from 'react';
import style from './Paginator.module.css';

let Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, onPreviousButtonPressed, onNextButtonPressed}) => {
    let pages = [];
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div className={style.pageNavigation}>
                <button onClick={() => {onPreviousButtonPressed()}}>Туда</button>
                <span>Page {currentPage}</span>
                <button onClick={() => {onNextButtonPressed()}}>Сюда</button>
            </div>
            <div className={style.pageNavigation}>
                {pages.map(page => {
                    return (
                        <span onClick={() => {onPageChanged(page)}}
                              className={currentPage === page ? style.selectedPage : style.page}>
                            {page + ' '}
                        </span>)
                })}
            </div>
        </div>
    )
};

export default Paginator;