import React from 'react';
import {updateStatus} from "../../../http/admin/orderAdminAPI";
import {Form} from "react-bootstrap";
import telephoneParser from "../../../utils/telephoneParser";
import Cash from "../../../UI/svgs/cash";
import CreditCard from "../../../UI/svgs/creditCard";
import TakeAway from "../../../UI/svgs/takeAway";
import Delivery from "../../../UI/svgs/delivery";

const OrderLine = ({item, showModal, statuses, handleUpdate}) => {
    let date = new Date(item.createdAt)
    date = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    const handleUpdateStatus = (e, id, status) => {
        e.preventDefault()
        updateStatus({id, status}).then(() => handleUpdate())
    }
    return (
        <div className="orderItem">
            <div>{date}</div>
            <div className="pointer link" onClick={() => showModal(item)}>{item.orderNumber}</div>
            <div style={{fontSize: "12px"}}>
                {item?.user?.id && `${item?.user?.id}. `}{item?.user?.name ? item.user.name : item?.customerName}
                <br />{item?.user?.email ? item.user.email : item?.customerEmail}
                <br />{item?.user?.telephone ?
                <a href={`tel:${telephoneParser(item.user.telephone)}`}>
                    {item.user.telephone}
                </a>
                 :
                <a href={`tel:${telephoneParser(item?.customerTel)}`}>
                    {item?.customerTel}
                </a>}
            </div>
            <div className="pointer" title={item.paymentMethodId===1 ? "Наличными" : "Безналичный рассчет"}>{item.paymentMethodId===1 ? <Cash /> :
                <CreditCard />}
            </div>
            <div className="pointer" title={item.deliveryMethodId===1 ? 'Самовывоз' : 'Доставка'}>{item.deliveryMethodId===1 ? <TakeAway /> :
                <Delivery />}

            </div>

            <div className= "w-100 d-flex justify-content-center"
                title={`Стоимость доставки: ${item.deliverySum}. Товаров на сумму: ${item.discountedSalesSum>0 ? item.discountedSalesSum: item.salesSum}`}
            ><strong>{item.discountedSalesSum>0 ? item.discountedSalesSum+item.deliverySum-item.bonusPointsUsed : item.salesSum+item.deliverySum-item.bonusPointsUsed} ₽
            </strong>
            </div>
            <Form id="OrderLineForm">
                <Form.Select className={item.status==="Выполнен" ? 'order-done' : item.status==="Отменен" ? 'order-canceled' : 'order-default'} onChange={(e) => handleUpdateStatus(e, item.id, e.target.value)} value={item.status} aria-label="Статус заказа">
                    {statuses.map((s, index) =>
                        <option className="orderOption" key={index} value={s}>{s}</option>
                    )}
                </Form.Select>
            </Form>
        </div>
    );
};

export default OrderLine;