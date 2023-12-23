import React from 'react';
import {Card, Form} from "react-bootstrap";
import MyPhoneInput from "../../UI/MyPhoneInput/MyPhoneInput";

const CustomerBlock = ({order, setOrder}) => {
    return (
        <div className="customerBlock">
            <Card>
                <Form>
                    <Form.Control onChange={event => setOrder({...order, customerName: event.target.value})} type='input' value={order.customerName} placeholder='Имя' />
                    <MyPhoneInput value={order.customerTel} onChange={event => setOrder({...order, customerTel:  event.target.value})} />
                    <Form.Control onChange={event => setOrder({...order, customerEmail: event.target.value})} type='input' value={order.customerEmail} placeholder='Email' />
                    <Form.Control onChange={event => setOrder({...order, orderAddress: event.target.value})} type='input' value={order.orderAddress} placeholder='Адрес доставки' />
                    <Form.Control as="textarea" rows={3} onChange={event => setOrder({...order, comment: event.target.value})} value={order.comment} placeholder='Комментарий к заказу' />
                </Form>
            </Card>
        </div>
    );
};

export default CustomerBlock;