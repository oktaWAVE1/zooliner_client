import React, {useContext, useEffect, useState} from 'react';
import {fetchCustomerOrders} from "../../http/orderAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import OrderLine from "./OrderLine";
import MyButton from "../../UI/MyButton/MyButton";
import {Accordion} from "react-bootstrap";
import OrderModal from "../modals/OrderModal";

const OrderList = observer(() => {
    const {user} = useContext(Context)
    const [modalVisible, setModalVisible] = useState(false);
    const [orders, setOrders] = useState([]);
    const [currentOrder, setCurrentOrder] = useState({});
    const [allOrders, setAllOrders] = useState([]);


    useEffect(() => {
        fetchCustomerOrders(user.user.id).then(res => {
            setAllOrders(res)
            setOrders(res.slice(0,5))
        })

    }, []);
    const loadFive = () => {
        setOrders(prev => [...prev, ...allOrders.slice(orders.length, allOrders.length-orders.length>4 ? orders.length+5 : allOrders.length)])
    }
    const loadAll = () => {
        setOrders(allOrders)
    }
    const showModal = (order) => {
        setCurrentOrder(order)
        setModalVisible(true)
    }
    return (
        <div>
            <OrderModal userId={user.user.id} order={currentOrder} onHide={() => setModalVisible(false)} show={modalVisible} />
            {orders.length>0 &&
            <Accordion className="customerOrdersAccordion">
                <Accordion.Item eventKey="0">
                    <Accordion.Header><h3  style={{color: "white", textAlign: "center", width: "100%"}}>Заказы</h3></Accordion.Header>
                    <Accordion.Body>
                        {orders.map(item =>
                        <OrderLine showModal={showModal} item={item} key={item.id} />
                        )
                        }
                        {allOrders.length!==orders.length &&
                            <div className="mt-3 d-flex gap-2 justify-content-center">
                                <MyButton onClick={() => loadFive()}>Загрузить еще 5</MyButton>
                                <MyButton onClick={() => loadAll()}>Загрузить все</MyButton>
                            </div>
                        }
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

                }
        </div>
    );
});

export default OrderList;