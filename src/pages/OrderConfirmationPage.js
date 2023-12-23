import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {fetchDeliveryMethods, fetchOrder, fetchPaymentMethods} from "../http/orderAPI";
import {useNavigate, useParams} from "react-router-dom";
import {Context} from "../index";
import Loader from "../UI/Loader/Loader";
import {Helmet} from "react-helmet";
import {fetchBonus} from "../http/userAPI";
import PaymentMethods from "../components/features/paymentMethods";
import DeliveryMethods from "../components/features/deliveryMethods";
import CustomerBlock from "../components/features/customerBlock";
import OrderSummaryBlock from "../components/features/orderSummaryBlock";
import OrderItemsBlock from "../components/features/orderItemsBlock";

const OrderConfirmationPage = observer(() => {
    const {user, basket, loading} = useContext(Context)
    const {accessLink} = useParams()
    const [currentPaymentMethod, setCurrentPaymentMethod] = useState({id: 0});
    const [order, setOrder] = useState({});
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [deliveryMethods, setDeliveryMethods] = useState([]);
    const [currentDeliveryMethod, setCurrentDeliveryMethod] = useState({id: 1, freeSum: 0, price: 0});
    const navigate = useNavigate()

    const switchPayment = (id) => {
        setCurrentPaymentMethod({id})
    }


    useEffect(() => {
        loading.setLoading(true)
        if (user.isAuth) {
            fetchBonus(user.user.id).then(data => user.setBonus(data))
        }
        fetchPaymentMethods().then(data => setPaymentMethods(data))
        fetchDeliveryMethods().then(data => setDeliveryMethods(data))
        fetchOrder(accessLink).then(data => {
            if(data.status !== "Создан"){
                navigate('/')
            }
            setOrder(data)
        }).finally(() => {
            loading.setLoading(false)
        })

    }, [user.isAuth]);

    if (loading.loading){
        return (
            <Loader />
        )
    } else {
        return (
            <div className='orderConfirmation'>
                <h1>Подтверждение заказа</h1>
                <OrderItemsBlock order={order} />
                <div className="payment_delivery">
                    <DeliveryMethods
                        currentDeliveryMethod={currentDeliveryMethod}
                        deliveryMethods={deliveryMethods} order={order}
                        setCurrentDeliveryMethod={setCurrentDeliveryMethod}
                    />
                    <PaymentMethods paymentMethods={paymentMethods} switchPayment={switchPayment} currentPaymentMethod={currentPaymentMethod} />

                </div>
                <CustomerBlock order={order} setOrder={setOrder} />
                <OrderSummaryBlock
                    order={order}
                    currentDeliveryMethod={currentDeliveryMethod}
                    user={user}
                    currentPaymentMethod={currentPaymentMethod}
                    basket={basket}
                />

                <Helmet>
                    <title>Подтверждение заказа | ЗооЛАЙНЕР</title>
                </Helmet>

            </div>
        );
    }
});

export default OrderConfirmationPage;