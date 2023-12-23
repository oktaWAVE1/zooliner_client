import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {
    clearBasketDB,
    deleteBasketItemDB,
    fetchBasket,
    fetchBasketUnauthorized,
    } from "../http/basketAPI";
import MyButton from "../UI/MyButton/MyButton";
import BasketItem from "../components/features/BasketItem";
import {Container} from "react-bootstrap";
import {useLocalStorage} from "../hooks/useStorage";
import BasketTotal from "../components/features/BasketTotal";
import {Helmet} from "react-helmet";
import {Link, useNavigate} from "react-router-dom";
import {createOrderAuth} from "../http/orderAPI";

const BasketPage = observer(() => {
    const [localBasket, setLocalBasket, clearLocalBasket] = useLocalStorage('basket', [])
    const navigate = useNavigate()

    const {user, basket} = useContext(Context)
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


    const clearBasket = () => {
        if(user.isAuth){
            clearBasketDB(user.user.id)
            fetchBasket(user.user.id).then(data => basket.setBasketItems(data))
        } else {
            clearLocalBasket()
            basket.setBasketItems([])
        }
    }

    const createOrder = () => {
        if(user.isAuth){
            createOrderAuth(user.user.id).then(data => {
                navigate('/order_confirmation/'+data.data)
            })
        }
    }

    const delBasketItem = (productId) => {
        if (user.isAuth){
            deleteBasketItemDB(user.user.id, productId).then(() => fetchBasket(user.user.id).then(data => basket.setBasketItems(data)))
        } else {
            setLocalBasket([...localBasket].filter(product => product.productId!==productId))
        }
    }
    if(basket.basketItems?.length > 0){
    return (
        <div className='basketPage'>
            <h1>Корзина</h1>
            <Container>
                <div className='BasketContainer'>
                    <div></div>
                    <div>Название</div>
                    <div>Количество</div>
                    <div>Цена</div>
                    <div>Сумма</div>
                </div>
                {basket.basketItems.map(item =>
                    <BasketItem user={user} basket={basket} delBasketItem={delBasketItem} localBasket={localBasket} setLocalBasket={setLocalBasket} key={item.productId+"|"+item.qty} item={item}/>
                )
                }
                    <MyButton classes="ClearBasket" onClick={() => clearBasket()}>очистить корзину</MyButton>
                <BasketTotal createOrder={createOrder} />
            </Container>
            <Helmet>
                <title>Корзина | ЗооЛАЙНЕР</title>
            </Helmet>
        </div>


    );
    } else {

    return (
        <div className='basketPage'>
            <h1>Ваша корзина пуста...</h1>
            <div className="emptyBasket">
                <div>
                    <MyButton  onClick={() => navigate("/")}>ВЕРНУТЬСЯ НА ГЛАВНУЮ</MyButton>
                </div>
                <div className="mt-3">
                    <img  src={`${process.env.REACT_APP_API_URL}/images/emptyBasket.png`} />
                </div>

            </div>
            <Helmet>
                <title>Корзина пуста | ЗооЛАЙНЕР</title>
            </Helmet>
                    </div>
    );}
});


export default BasketPage;