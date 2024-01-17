import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import MyButton from "../../UI/MyButton/MyButton";

const BasketTotal = observer(({createOrder}) => {
    const {basket} = useContext(Context)
    const [total, setTotal] = useState(0)
    const [discount, setDiscount] = useState(0);
    useEffect(() => {
        if (basket.basketItems?.length>0) {
            let tempTotal = 0
            let tempDiscount = 0
            for (let i=0; i<basket.basketItems.length; i++) {
                if(basket.basketItems[i].product.discountedPrice>0) {

                    tempTotal += basket.basketItems[i].product.discountedPrice * basket.basketItems[i].qty
                    tempDiscount += (basket.basketItems[i].product.price - basket.basketItems[i].product.discountedPrice) * basket.basketItems[i].qty
                } else {
                    tempTotal += basket.basketItems[i].product.price * basket.basketItems[i].qty
                }
            }
            setDiscount(tempDiscount)
            setTotal(tempTotal)
        }
    }, [basket.basketItems]);
    return (
        <div className="BasketTotal mb-3">
            <hr/>
            {discount> 0 &&
                <h4>Ваша скидка: {discount} ₽</h4>
            }
            <h4>Итого: {total} ₽</h4>
            <MyButton onClick={() => createOrder()}>Оформить заказ</MyButton>
        </div>
    );
});

export default BasketTotal;