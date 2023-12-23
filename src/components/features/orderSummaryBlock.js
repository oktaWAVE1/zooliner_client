import React, {useContext, useState} from 'react';
import {Card, Form, Row} from "react-bootstrap";
import MyButton from "../../UI/MyButton/MyButton";
import {placeOrder} from "../../http/orderAPI";
import {useNavigate} from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";


const OrderSummaryBlock = observer(({basket, order, currentDeliveryMethod, currentPaymentMethod}) => {
    const navigate = useNavigate()
    const {user, loading} = useContext(Context)
    const [bonusPoints, setBonusPoints] = useState('');
    const userBonusPoints = (e) => {
        if(e.target.value<0){
            setBonusPoints('')
        }
        else if ((e.target.value) <= user.bonus.currentQty && (e.target.value) <= order.discountedSalesSum){
            setBonusPoints(e.target.value)
        } else if (order.discountedSalesSum < user.bonus.currentQty){
            setBonusPoints(order.discountedSalesSum)
        } else {
            setBonusPoints(user.bonus.currentQty)
        }
    }
    const placeCurrentOrder = async (e) => {
        e.preventDefault()
        await placeOrder({
            orderId: order.id,
            paymentMethodId: currentPaymentMethod.id,
            deliveryMethodId: currentDeliveryMethod.id,
            name: order.customerName,
            address: order.orderAddress,
            telephone: order.customerTel,
            bonusPoints: bonusPoints,
            comment: order.comment,
            customerEmail: order.customerEmail,
            userId: user?.user?.id
        }).then(() => basket.setBasketItems([])).then(() => navigate('/success')).finally(() => loading.setLoading(false))
    }


    return (
        <div className="summaryBlock">
            <Card>
                <Form>
                    {user.isAuth &&
                        <div className="useBonusPoints">
                            <span>Бонусы: </span><Form.Control onChange={e => userBonusPoints(e)} type='number' value={bonusPoints} placeholder={`Использовать Баллы (доступно: ${Math.floor(user.bonus.currentQty)})`} />
                        </div>

                    }
                    <div className="result">
                        <span>Стоимость доставки: </span><span>{order.discountedSalesSum>=currentDeliveryMethod.freeSum ? 0 : currentDeliveryMethod.price}</span>
                        <span>Итого: </span><span>{order.discountedSalesSum >= currentDeliveryMethod.freeSum ? order.discountedSalesSum - (parseInt(bonusPoints) || 0) : order.discountedSalesSum+currentDeliveryMethod.price - (parseInt(bonusPoints) || 0)}</span>
                    </div>
                </Form>
                <Row className="m-1">
                    <MyButton onClick={e => {
                        loading.setLoading(true)
                        placeCurrentOrder(e)
                    }} disabled={!order.customerTel}>Отправить заказ</MyButton>
                </Row>
            </Card>
        </div>
    );
});

export default OrderSummaryBlock;