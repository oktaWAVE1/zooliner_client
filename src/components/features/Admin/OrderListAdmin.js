import React, {useEffect, useState} from 'react';
import {fetchAllOrders} from "../../../http/orderAPI";
import {Form} from "react-bootstrap";
import OrderModal from "../../modals/OrderModal";
import OrderLineAdmin from "./OrderLineAdmin";
import {useOrdersSortSearch} from "../../../hooks/useOrdersSortSearch";
import ModalPagination from "./ModalPagination";
import useDebounce from "../../../hooks/useDebounce";
import {fetchStatuses} from "../../../http/admin/orderAdminAPI";
import {useNavigate} from "react-router-dom";
import MyButton from "../../../UI/MyButton/MyButton";

const OrderListAdmin =() => {
    const [modalVisible, setModalVisible] = useState(false);
    const [currentOrder, setCurrentOrder] = useState({});
    const [currentOrders, setCurrentOrders] = useState([]);
    const [query, setQuery] = useState('');
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [statuses, setStatuses] = useState([]);
    const [update, setUpdate] = useState(0);
    const navigate = useNavigate()
    useEffect(() => {
        fetchAllOrders().then(data => {
            setOrders(data)
        })
    }, [update]);
    useEffect(() => {
        fetchStatuses().then(data => {
            setStatuses(Object.values(data))
        })
        // eslint-disable-next-line
    }, []);
    const searchedOrders = useOrdersSortSearch(orders, query);


    useDebounce(() => {
        setCurrentOrders([...searchedOrders].slice(limit*(page-1), limit*page))

    }, 200, [page, limit, searchedOrders]);

    const showModal = (order) => {
        setCurrentOrder(order)
        setModalVisible(true)
    }
    const handleUpdate = () => {
        setUpdate(prev => prev+1)
    }
    return (
        <div>
            <OrderModal order={currentOrder} onHide={() => setModalVisible(false)} show={modalVisible} />
            <div className="d-flex justify-content-between align-items-end">
                <label>
                    <input min={5} max={1000} className='adminLimit mb-1' type='number' value={limit} onChange={e => setLimit(e.target.value)} />
                    <span style={{marginLeft: "15px"}}>Лимит</span>
                </label>
                <MyButton classes={"pb-1 pt-1"} onClick={() => navigate(-1)}>НАЗАД</MyButton>

            </div>
            <hr className="mt-2 mb-2 pt-0" />
            <Form id="ProductSearchForm" className="mb-3">
                <Form.Control type={'text'} placeholder="Поиск заказа..." value={query} onChange={(e) => setQuery(e.target.value)} />
            </Form>
        {currentOrders?.length>0 &&
            currentOrders.map(item =>
                <OrderLineAdmin handleUpdate={handleUpdate} update={update} statuses={statuses} showModal={showModal} item={item} key={item.id} />
            )
        }
        <ModalPagination page={page} setPage={setPage} limit={limit} total={searchedOrders.length} />

        </div>
    );
};

export default OrderListAdmin;