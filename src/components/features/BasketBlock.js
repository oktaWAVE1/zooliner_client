import React, {useContext, useEffect} from 'react';
import {NavLink} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchBasket, fetchBasketUnauthorized} from "../../http/basketAPI";
import {useLocalStorage} from "../../hooks/useStorage";

const BasketBlock = observer(() => {
    const {user, basket} = useContext(Context)
    const [localBasket, setLocalBasket, clearLocalBasket] = useLocalStorage('basket', [])
    useEffect(() => {
        if (user.isAuth) {
            fetchBasket(user.user.id).then(data => basket.setBasketItems(data))
        } else if (localBasket?.length>0) {
            fetchBasketUnauthorized(JSON.stringify(localBasket)).then(data => basket.setBasketItems(data)
            )
        } else {
            basket.setBasketItems([])
        }
    }, [user.isAuth, localBasket]);
    return (
        <div className='basketBlock' title='Корзина'>
            <NavLink to='/basket' alt="Корзина" title="Корзина">
                <div className='shoppingCart'>
                    <div><span className="material-symbols-outlined">
                                    shopping_cart
                                    </span>{basket.basketItems.length>0 ? <span className="basketItems">{basket.basketItems.length}</span> : ""}</div>


                </div>
            </NavLink>
        </div>
    );
});

export default BasketBlock;