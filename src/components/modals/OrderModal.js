import React from 'react';
import {Form, Modal, Row} from "react-bootstrap";
import MyButton from "../../UI/MyButton/MyButton";
import OrderModalItem from "../features/OrderModalItem";
import {duplicateOrder} from "../../http/orderAPI";
import {useNavigate} from "react-router-dom";

const OrderModal = ({onHide, show, order, userId}) => {
    const navigate = useNavigate()
    let date = new Date(order.createdAt)
    date = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    const repeatOrder = async() => {
        await duplicateOrder(order.id, userId).then(() => navigate('/basket'))
    }
    return (
        <Modal
            className='modal'
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3 >Заказ № {order.orderNumber}: </h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div>Статус: {order.status}</div>
                    <div>Дата заказа: {date}</div>
                    <div>Адрес доставки: {order.orderAddress}</div>
                    <div>Стоимость доставки: {order.deliverySum}</div>
                    {order?.bonusPointsUsed>0 &&
                        <div>Бонусов потрачено: {order.bonusPointsUsed}</div>
                    }
                    <div>Стоимость заказа: {order.discountedSalesSum>0 ? order.discountedSalesSum+order.deliverySum-order.bonusPointsUsed : order.salesSum+order.deliverySum-order.bonusPointsUsed} ₽</div>
                    <hr />
                    <div>
                        <div className="orderModalItemsHeader">
                            <div>Наименование</div>
                            <div className="text-center">Цена</div>
                            <div className="text-center">Кол.</div>
                            <div>Сумма</div>
                        </div>
                        {order?.order_items &&
                            order?.order_items.map(i =>
                                <OrderModalItem key={i.id} item={i} />
                            )
                        }
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <MyButton onClick={repeatOrder}>Повторить заказ</MyButton>
                <MyButton onClick={onHide}>Закрыть</MyButton>
            </Modal.Footer>
        </Modal>
    );
};

export default OrderModal;