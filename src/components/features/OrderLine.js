import React from 'react';

const OrderLine = ({item, showModal}) => {
    let date = new Date(item.createdAt)
    date = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`

    return (
        <div className="orderItem">
            <div>{date}</div>
            <div className="pointer link" onClick={() => showModal(item)}>{item.orderNumber}</div>
            <div>{item.paymentMethodId===1 ? <span className="material-symbols-outlined pointer" title='Наличными'>
                                            payments
                                        </span> :
                <span className="material-symbols-outlined pointer" title='Безналичный рассчет'>
                                            credit_card
                        </span>}
            </div>
            <div>{item.deliveryMethodId===1 ? <span className="material-symbols-outlined pointer" title='Самовывоз'>
                                            storefront
                                        </span> :
                <span  className="material-symbols-outlined pointer" title='Доставка'>
                                            local_shipping
                        </span>}

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