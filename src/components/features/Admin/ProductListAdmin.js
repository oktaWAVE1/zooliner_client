import React, {useEffect, useState} from 'react';
import {fetchAllProducts} from "../../../http/admin/productAdminAPI";
import MyButton from "../../../UI/MyButton/MyButton";
import {Form} from "react-bootstrap";
import ModalPagination from "./ModalPagination";
import {useNavigate} from "react-router-dom";
import useDebounce from "../../../hooks/useDebounce";
import ProductLineAdmin from "./ProductLineAdmin";
import AdminProductModal from "../../modals/AdminProductModal";
import {useProductsSortSearch} from "../../../hooks/useProductsSortSearch";
import Loader from "../../../UI/Loader/Loader";
import AdminProductFilter from "../../filters/AdminProductFilter";

const UserListAdmin = () => {
    const [products, setProducts] = useState([]);

    const [query, setQuery] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentProducts, setCurrentProducts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [limit, setLimit] = useState(15);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({published: '', inStock: '', hasImages: '', special: '', hidden: '', brandId: 0, categoryId: 0});
    const [sort, setSort] = useState('name');
    const [update, setUpdate] = useState(0);

    const navigate = useNavigate()


    const showProduct = (productId) => {
        setCurrentProductId(productId)
        setModalVisible(true)
    }
    useDebounce(() => {
        setSearchQuery(query)
        setPage(1)
    }, 500, [query])

    const searchedProducts = useProductsSortSearch(products, searchQuery, filters, sort)
    useEffect(() => {
        setLoading(true)

        fetchAllProducts().then(data => {
            for (let product of data){
                const categories = []
                product.category.forEach(c => categories.push(c.id))
                product.categories = categories
            }
            setProducts(data)
        }).finally(() => setLoading(false))
        // eslint-disable-next-line
    }, [update]);

    useDebounce(() => {
        setCurrentProducts([...searchedProducts].slice(limit*(page-1), limit*page))
    }, 0, [page]);

    useDebounce(() => {
        setPage(2)
        setPage(1)
    }, 0, [update]);

    useDebounce(() => {
        setCurrentProducts([...searchedProducts].slice(0, (searchedProducts.length>limit ? limit: searchedProducts.length)))
    }, 200, [limit, searchedProducts, filters]);

    if (loading) return <Loader />

    return (
        <div>
            <AdminProductModal productId={currentProductId} onHide={() => setModalVisible(false)} show={modalVisible} />
            <div className="d-flex justify-content-between align-items-end mb-2">
                <label>
                    <input min={5} max={1000} className='adminLimit mb-1' type='number' value={limit} onChange={e => setLimit(e.target.value)} />
                    <span style={{marginLeft: "15px"}}>Лимит</span>
                </label>
                <MyButton classes={"pb-1 pt-1"} onClick={() => navigate(-1)}>НАЗАД</MyButton>

            </div>
            <AdminProductFilter setUpdate={setUpdate} setFilters={setFilters} filters={filters} sort={sort} setSort={setSort} />


            <hr className="mt-2 mb-2 pt-0" />
            <Form id="ProductListAdminForm" className="mb-3">
                <Form.Control type={'text'} placeholder="Поиск товара..." value={query} onChange={(e) => setQuery(e.target.value)} />
            </Form>
            {currentProducts?.length>0 &&
                <div className='adminProductsList'>
                    {
                        currentProducts.map(product =>
                            <ProductLineAdmin setUpdate={setUpdate} showProduct={showProduct} product={product} key={product.id} />
                        )
                    }
                </div>

            }
            <ModalPagination page={page} setPage={setPage} limit={limit} total={searchedProducts.length} />

        </div>
    );
};

export default UserListAdmin;