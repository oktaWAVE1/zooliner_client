import React, {useEffect, useState} from 'react';
import {fetchAllProductStocks} from "../../http/admin/remoteAdminAPI";
import ModalPagination from "./Admin/ModalPagination";
import useDebounce from "../../hooks/useDebounce";
import {Form} from "react-bootstrap";
import fuseSearchStocks from "../../utils/admin/fuseSearchStocks";

const StocksList = () => {
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState('');
    const [currentProducts, setCurrentProducts] = useState([]);
    const limit = 3
    const [searchedProducts, setSearchedProducts] = useState([]);
    useEffect(() => {
        setSearchedProducts(fuseSearchStocks(query, 10, products))
    }, [query, products]);

    useEffect(() => {
        fetchAllProductStocks().then(data => {
            setProducts(data)
        })
    }, []);

    useDebounce(() => {
        setPage(1)
        setCurrentProducts([...searchedProducts].slice(limit*(0), limit))
    }, 1000, [searchedProducts]);

    useDebounce(() => {
        setCurrentProducts([...searchedProducts].slice(limit*(page-1), limit*page))
    }, 200, [page, limit]);
    return (
        <div className="px-4">
            <Form id="ProductSticksSearchForm" className="mb-3">
                <Form.Control type={'text'} placeholder="Поиск товара..." value={query} onChange={(e) => setQuery(e.target.value)} />
            </Form>
            {currentProducts?.length>0 &&
                currentProducts.map(p =>
                    p?.children?.length===0 ? <div className='stockListItem' key={p.item.Код}>
                            <div className="text-center">{p?.item.Код}</div>
                            <div>{p.item?.Наименование} {p.item?.['Наименование (крат опис)']}</div>
                            <div className="text-center">{p.item?.product_in_stock}</div>
                            <div className="text-end">{p.item?.Цена} р.</div>
                        </div> :
                        p.item.children.map(pc =>
                            <div className='stockListItem' key={pc.Код}>
                                <div className="text-center">{pc?.Код}</div>
                                <div>{p.item?.Наименование} {p.item?.['Наименование (крат опис)']} {pc?.Наименование}</div>
                                <div className="text-center">{pc?.product_in_stock}</div>
                                <div className="text-end">{pc?.Цена} р.</div>
                            </div>
                        )
                )
            }

            <ModalPagination total={searchedProducts?.length} page={page} setPage={setPage} limit={limit} />
        </div>
    );
};

export default StocksList;