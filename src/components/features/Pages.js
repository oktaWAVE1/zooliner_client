import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Pagination} from "react-bootstrap";

const Pages = observer(() => {
    const {products} = useContext(Context)
    const pageCount = Math.ceil(products.totalCount/products.limit)
    const pages = []
    const clickPage = (p) => {
        products.setPage(p)
        document.getElementById("Content").scrollIntoView();
    }
    for (let i=1; i<= pageCount; i++){
        pages.push(i)
    }
    return (
        <Pagination>
            {pages.map(p =>
                <Pagination.Item
                    active={p === products.page}
                    key={p}
                    onClick={() => clickPage(p)}
                >
                    {p}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;