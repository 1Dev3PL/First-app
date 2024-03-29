import React, {useState} from 'react';
import style from './Paginator.module.css';

type PropsType = {
    totalItemsCount: number
    pageSize: number
    portionSize: number
    currentPage: number
    onPageChanged: (page: number) => void
    onPreviousButtonPressed: () => void
    onNextButtonPressed: () => void
    onPageSizeChanged: (pageSize: number) => void
}

let Paginator: React.FC<PropsType> = ({
                                          onPageSizeChanged,
                                          totalItemsCount,
                                          pageSize,
                                          portionSize,
                                          currentPage,
                                          onPageChanged,
                                          onPreviousButtonPressed,
                                          onNextButtonPressed
                                      }) => {

    let pages: Array<number> = [];
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let portionsCount = Math.ceil(pagesCount / portionSize);
    let [currentPortion, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (currentPortion - 1) * portionSize + 1
    let rightPortionPageNumber = currentPortion * portionSize

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className={style.pageNavigation}>
            {portionsCount > 0 &&
            <div>
                <div className={style.pageNavigationLayer}>
                    {currentPage > 1 ? <button onClick={() => {
                        onPreviousButtonPressed()
                    }}>Сюда</button> : null}
                    <span>Page {currentPage}</span>
                    {currentPage < pagesCount ? <button onClick={() => {
                        onNextButtonPressed()
                    }}>Туда</button> : null}
                </div>
            </div>}
            <div>
                <div className={style.pageNavigationLayer}>
                    {currentPortion > 1 && <button onClick={() => {
                        setPortionNumber(currentPortion - 1)
                    }}>Previous</button>}
                    <div className={style.pageNavigationLayer}>
                        {pages.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber).map(page => {
                            return (
                                <span key={page} onClick={() => {
                                    onPageChanged(page)
                                }}
                                      className={currentPage === page ? style.selectedPage : style.page}>
                            {page}
                        </span>)
                        })}
                    </div>
                    {portionsCount > currentPortion && <button onClick={() => {
                        setPortionNumber(currentPortion + 1)
                    }}>Next</button>}
                </div>
            </div>
            <div className={style.pageNavigationLayer}>
                <span className={pageSize === 20 ? style.selectedPageSize : style.pageSize}
                      onClick={() => {
                          pageSize !== 20 && onPageSizeChanged(20)
                      }}>20</span>
                <span className={pageSize === 50 ? style.selectedPageSize : style.pageSize}
                      onClick={() => {
                          pageSize !== 50 && onPageSizeChanged(50)
                      }}>50</span>
                <span className={pageSize === 100 ? style.selectedPageSize : style.pageSize}
                      onClick={() => {
                          pageSize !== 100 && onPageSizeChanged(100)
                      }}>100</span>
            </div>
        </div>
    )
};

export default Paginator;