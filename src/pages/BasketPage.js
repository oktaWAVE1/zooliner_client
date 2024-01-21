import React, {useContext, useEffect} from 'react';
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
import {useNavigate} from "react-router-dom";
import {createOrderAnuthorized, createOrderAuth} from "../http/orderAPI";
import {ym} from "react-ym";

const BasketPage = observer(() => {
    const [localBasket, setLocalBasket, clearLocalBasket] = useLocalStorage('basket', [])
    const navigate = useNavigate()

    const {user, basket} = useContext(Context)
    useEffect(() => {
        console.log(user.isAuth)
        if (user.isAuth) {
            fetchBasket(user.user.id).then(data => {
                console.log(data)
                basket.setBasketItems(data)
            })
        } else if (localBasket?.length>0) {
            fetchBasketUnauthorized(JSON.stringify(localBasket)).then(data => basket.setBasketItems(data)
            )
        } else {
            basket.setBasketItems([])
        }
        // eslint-disable-next-line
    }, [user.isAuth, localBasket, user.user.id]);


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
        window.ym(40042180,'reachGoal','makeOrder')
        if(user.isAuth){
            createOrderAuth(user.user.id).then(data => {
                navigate('/order_confirmation/'+data.data)
            })
        } else {

            createOrderAnuthorized(localBasket).then(data => {
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
                <meta property="og:title" content="Корзина пуста | ЗооЛАЙНЕР" />
                <meta property="og:image" content="https://zooliner.ru/" />
                <meta property="og:description" content="Товары для животных в Анапе с доставкой в день заказа." />

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
                    <img alt='empty basket' src={`${process.env.REACT_APP_API_URL}/images/emptyBasket.png`} />
                </div>

            </div>
            <Helmet>
                <title>Корзина пуста | ЗооЛАЙНЕР</title>
                <meta property="og:title" content="Корзина пуста | ЗооЛАЙНЕР" />
                <meta property="og:image" content="https://zooliner.ru/" />
                <meta property="og:description" content="Товары для животных в Анапе с доставкой в день заказа." />

            </Helmet>
                    </div>
    );}
});


export default BasketPage;