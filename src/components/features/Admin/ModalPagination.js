import React, {useEffect, useState} from 'react';
import {Pagination} from "react-bootstrap";

const ModalPagination = ({total, limit, setPage, page}) => {
    const [pages, setPages] = useState([1]);
    const clickPage = (page) =>{
        setPage(page)
    }
    useEffect(() => {
        const lastPage = Math.ceil(total/limit)
        let pageArray = []
        if (total/limit<7){
            pageArray = []
            for (let i=1; i<=lastPage; i++){
                pageArray.push(i)
            }
        } else if (page<4 || page>lastPage-3){
            pageArray =[1, 2, 3, 4, '...', lastPage-3, lastPage-2, lastPage-1, lastPage]
        } else {
            pageArray = [1, '...', page-2, page-1, page, page+1, page+2, '...', lastPage]
        }
        setPages([...pageArray])
        pageArray = []
    }, [total, page, limit]);

    return (
        <div>
            <Pagination>
                {pages.map((p, index) =>
                    <Pagination.Item
                        className={typeof(p)!=='number' && "paginationDelimiter"}
                        active={p === page}
                        key={index}
                        onClick={() => typeof(p)==='number' &&  clickPage(p)}
                    >
                        {p}
                    </Pagination.Item>
                )}
            </Pagination>
        </div>
    );
};

export default ModalPagination;