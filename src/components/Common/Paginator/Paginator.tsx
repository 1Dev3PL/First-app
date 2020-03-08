import React from 'react';
import style from './Paginator.module.css';

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (page: number) => void
    onPreviousButtonPressed: () => void
    onNextButtonPressed: () => void
}

let Paginator: React.FC<PropsType> = ({totalItemsCount,
                                      pageSize,
                                      currentPage,
                                      onPageChanged,
                                      onPreviousButtonPressed,
                                      onNextButtonPressed}) => {
    let pages: Array<number> = [];
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
                        <span key={page} onClick={() => {onPageChanged(page)}}
                              className={currentPage === page ? style.selectedPage : style.page}>
                            {page + ' '}
                        </span>)
                })}
            </div>
        </div>
    )
};

export default Paginator;