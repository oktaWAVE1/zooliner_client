import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {fetchDeliverytMethods, fetchOrder, fetchPaymentMethods} from "../http/orderAPI";
import {useParams} from "react-router-dom";
import {Context} from "../index";
import Loader from "../UI/Loader/Loader";
import {Card, Form, Row} from "react-bootstrap";
import {Helmet} from "react-helmet";
import AdminLessons from "../components/modals/AdminLessons";
import MapModal from "../components/modals/MapModal";
import {fetchBonus} from "../http/userAPI";
import MyButton from "../UI/MyButton/MyButton";

const OrderConfirmationPage = observer(() => {
    const {user} = useContext(Context)
    const {accessLink} = useParams()
    const [currentDeliveryMethod, setCurrentDeliveryMethod] = useState({id: 1, freeSum: 0, price: 0});
    const [currentPaymentMethod, setCurrentPaymentMethod] = useState({id: 0});
    const [loader, setLoader] = useState(true);
    const [order, setOrder] = useState({});
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [deliveryMethods, setDeliveryMethods] = useState([]);
    const [mapModal, setMapModal] = useState(false);
    const [bonusPoints, setBonusPoints] = useState('');
    const switchPayment = (id) => {
        setCurrentPaymentMethod({id})
        console.log(user.user)
    }
    const useBonusPoints = (e) => {
        if ((e.target.value) <= user.bonus.currentQty && (e.target.value) <= order.discountedSalesSum){
            setBonusPoints(e.target.value)
        } else if (order.discountedSalesSum < user.bonus.currentQty){
            setBonusPoints(order.discountedSalesSum)
        } else {
            setBonusPoints(user.bonus.currentQty)
        }
    }

    const switchDelivery = (id) => {
        deliveryMethods.forEach(d => d.id===id && setCurrentDeliveryMethod(d))
    }
    useEffect(() => {

        fetchPaymentMethods().then(data => setPaymentMethods(data.data))
        fetchDeliverytMethods().then(data => setDeliveryMethods(data.data))
        if (user.isAuth) {

            fetchBonus(user.user.id).then(data => user.setBonus(data)).then(() => console.log(user.bonus))

        }
        fetchOrder(accessLink).then(data => {
            setOrder(data.data)

        }).finally(() => {
            setLoader(false)
        })

    }, [user.isAuth]);
    if (loader){
        return (
            <Loader />
        )
    } else {
        return (
            <div className='orderConfirmation'>
                <h1>Подтверждение заказа</h1>
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

                            {order?.order_items.length>0 &&
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
                <div className="payment_delivery">
                <div className="delivery_methods">
                    <Card>
                        <h3>Выберите способ доставки:</h3>

                        {deliveryMethods.length>0 &&

                            <Form>
                                {deliveryMethods.sort((a,b) => a.id-b.id).map(d =>
                                    <Form.Check type="switch" id={d.id} label={d.name} key={`${d.id}`} isValid={order.discountedSalesSum >= d.minSum} disabled={order.discountedSalesSum < d.minSum} checked={d.id===currentDeliveryMethod.id} onChange={() => switchDelivery(d.id)}
                                        title={order.discountedSalesSum < d.minSum ? `Минимальная сумма заказа для доставки: ${d.minSum} р.` : "Способ доставки"}
                                    />

                                )
                                }
                                <a onClick={() => setMapModal(prev => !prev)} href='#'><div className='mapModal'><span
                                className="material-symbols-outlined">
map
</span><span> зоны доставки</span></div></a>
                            </Form>

                        }
                    </Card>
                </div>
                <div className="payment_methods">
                    <Card>
                        <h3>Выберите способ оплаты:</h3>
                    {paymentMethods.length>0 &&

                            <Form>

                                {paymentMethods.sort((a,b) => a.id-b.id).map(p =>
                                <Form.Check type="switch" id={p.id} label={p.name} key={`${p.id}`} isValid={true} checked={p.id===currentPaymentMethod.id} onChange={() => switchPayment(p.id)}  />

                                )
                                }

                            </Form>

                    }
                    </Card>
                </div>


                </div>

                <div className="customerBlock">
                    <Card>
                        <Form>
                            <Form.Control onChange={event => setOrder({...order, customerName: event.target.value})} type='input' value={order.customerName} placeholder='Имя' />
                            <Form.Control onChange={event => setOrder({...order, customerTel:  event.target.value})} type='input' value={order.customerTel} placeholder='Телефон' />
                            <Form.Control onChange={event => setOrder({...order, customerEmail: event.target.value})} type='input' value={order.customerEmail} placeholder='Email' />
                            <Form.Control onChange={event => setOrder({...order, orderAddress: event.target.value})} type='input' value={order.orderAddress} placeholder='Адрес доставки' />
                            <Form.Control as="textarea" rows={3} onChange={event => setOrder({...order, comment: event.target.value})} value={order.comment} placeholder='Комментарий к заказу' />
                        </Form>
                    </Card>
                </div>
                <div className="summaryBlock">
                    <Card>
                        <Form>
                            {user.isAuth &&
                                <div className="useBonusPoints">
                                    <span>Бонусы: </span><Form.Control onChange={e => useBonusPoints(e)} type='number' value={bonusPoints} placeholder={`Использовать Баллы (доступно: ${Math.floor(user.bonus.currentQty)})`} />
                                </div>

                            }
                            <div className="result">
                                <span>Стоимость доставки: </span><span>{order.discountedSalesSum>=currentDeliveryMethod.freeSum ? 0 : currentDeliveryMethod.price}</span>
                                <span>Итого: </span><span>{order.discountedSalesSum >= currentDeliveryMethod.freeSum ? order.discountedSalesSum - (parseInt(bonusPoints) || 0) : order.discountedSalesSum+currentDeliveryMethod.price - (parseInt(bonusPoints) || 0)}</span>
                            </div>
                        </Form>
                        <Row className="m-3">
                            <MyButton>Отправить заказ</MyButton>
                        </Row>
                    </Card>
                </div>

                <Helmet>
                    <title>Подтверждение заказа | Зоолайнер</title>
                </Helmet>
                <MapModal onHide={() => setMapModal(prev => !prev)} show={mapModal} />
            </div>
        );
    }
});

export default OrderConfirmationPage;