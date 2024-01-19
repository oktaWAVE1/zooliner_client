import React from 'react';
import Cash from "../../UI/svgs/cash";
import CreditCard from "../../UI/svgs/creditCard";
import TakeAway from "../../UI/svgs/takeAway";
import Delivery from "../../UI/svgs/delivery";

const OrderLine = ({item, showModal}) => {
    let date = new Date(item.createdAt)
    date = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`

    return (
        <div className="orderItem py-1">
            <div>{date}</div>
            <div className="pointer link" onClick={() => showModal(item)}>{item.orderNumber}</div>
            <div title={item.paymentMethodId===1
                ? "Наличными"
                : 'Безналичный рассчет'}>
                    {item.paymentMethodId===1
                        ? <span className="pointer"> <Cash /> </span>
                        : <span className="pointer"> <CreditCard /> </span>
                    }
            </div>
            <div title={item.deliveryMethodId===1 ? "Самовывоз" : "Доаставка"}>
                {item.deliveryMethodId===1
                    ? <span className="pointer"> <TakeAway /> </span>
                    : <span  className="pointer"> <Delivery /> </span>}

            </div>

            <div className= "text-left"
                title={`Стоимость доставки: ${item.deliverySum}. Товаров на сумму: ${item.discountedSalesSum>0 ? item.discountedSalesSum: item.salesSum}`}
            ><strong>{item.discountedSalesSum>0 ? item.discountedSalesSum+item.deliverySum-item.bonusPointsUsed : item.salesSum+item.deliverySum-item.bonusPointsUsed} ₽
            </strong>
            </div>
        </div>
    );
};

export default OrderLine;