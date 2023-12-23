import React from 'react';
import {Card} from "react-bootstrap";

const OrderItemsBlock = ({order}) => {
    return (
        <div className="orderItemsBlock">
            <Card>
                <div>
                    <h3>Товары:</h3>
                    <div className="header">
                        <span></span>
                        <span></span>
                        <span>Цена</span>
                        <span>Кол.</span>
                        <span>Сумма</span>
                    </div>
                    {order?.order_items?.length>0 &&
                        order.order_items.map(i =>

                            <div className="item" key={i.id}>
                                            <span className="orderItemImg">
                                                <img loading="lazy" src={`${process.env.REACT_APP_API_URL}/images/products/mini/${i.product?.parent?.product_images[0]?.img ?? i.product?.product_images[0]?.img ?? "no_image.webp"}`}/>
                                            </span>
                                <span>{i.name}</span>
                                <span>{i.price} ₽</span>
                                <span>{i.qty}</span>
                                <span>{i.sum} ₽</span>
                            </div>
                        )
                    }
                    <div className="total">
                        <div>
                            <div><span>Сумма: </span><span>{order.salesSum} ₽</span></div>
                        </div>

                        {(order.discountedSalesSum < order.salesSum) &&
                            <div>
                                <hr/>
                                <div><span>Скидка: </span><span>{order.salesSum - order.discountedSalesSum} ₽</span></div>
                                <hr/>
                                <div><span>Сумма со cкидкой: </span><span>{order.discountedSalesSum} ₽</span></div>
                            </div>
                        }
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default OrderItemsBlock;