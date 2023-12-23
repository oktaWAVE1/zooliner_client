import React, {useEffect, useState} from 'react';
import {Pagination} from "react-bootstrap";

const ModalPagination = ({total, limit, setPage, page}) => {
    const [pages, setPages] = useState([1]);
    const clickPage = (page) =>{
        setPage(page)
    }
    useEffect(() => {
        let pageArray = []
        for (let i=1; i<=Math.ceil(total/limit); i++){
            pageArray.push(i)
        }
        setPages(pageArray)
    }, [total]);

    return (
        <div>
            <Pagination>
                {pages.map(p =>
                    <Pagination.Item
                        active={p === page}
                        key={p}
                        onClick={() => clickPage(p)}
                    >
                        {p}
                    </Pagination.Item>
                )}
            </Pagination>
        </div>
    );
};

export default ModalPagination;