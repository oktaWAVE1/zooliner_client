import React from 'react';
import {Link} from "react-router-dom";

const OrderModalItem = ({item}) => {
    return (
        <div className="orderModalItem">
            <div><Link to={`/product/${!item.product.parent ? item.product.id : item.product.parent.id}`}>{item.name}</Link></div>
            <div className="text-center">{item.discountedPrice ? item.discountedPrice : item.price}</div>
            <div className="text-center">{item.qty}</div>
            <div>{item.sum} ₽</div>
        </div>
    );
};

export default OrderModalItem;