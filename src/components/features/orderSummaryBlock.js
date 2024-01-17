import React, {useContext, useState} from 'react';
import {Card, Form, Row} from "react-bootstrap";
import MyButton from "../../UI/MyButton/MyButton";
import {placeOrder} from "../../http/orderAPI";
import {Link, useNavigate} from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";


const OrderSummaryBlock = observer(({basket, order, currentDeliveryMethod, currentPaymentMethod}) => {
    const navigate = useNavigate()
    const {user, loading} = useContext(Context)
    const [personalData, setPersonalData] = useState(true);
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
        loading.setLoading(true)
        basket.setBasketItems([])
        navigate('/success')
        loading.setLoading(false)
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
        })

    }

    return (
        <div className="summaryBlock">
            <Card>
                <Form id="SummaryBlockForm">
                    {user.isAuth &&
                        <div className="useBonusPoints">
                            <span>Бонусы: </span><Form.Control onChange={e => userBonusPoints(e)} type='number' value={bonusPoints} placeholder={`Использовать Баллы (доступно: ${Math.floor(user.bonus.currentQty)})`} />
                        </div>

                    }
                    <div className="result">
                        <span>Стоимость доставки: </span><span>{order.discountedSalesSum>=currentDeliveryMethod.freeSum ? 0 : currentDeliveryMethod.price}</span>
                        <span>Итого: </span><span>{order.discountedSalesSum >= currentDeliveryMethod.freeSum ? order.discountedSalesSum - (parseInt(bonusPoints) || 0) : order.discountedSalesSum+currentDeliveryMethod.price - (parseInt(bonusPoints) || 0)}</span>
                    </div>
                    <Form.Label className="px-3 d-flex gap-3 justify-content-center align-items-center">
                        <Form.Check checked={personalData} onChange={() => setPersonalData(prev => !prev)} />
                        <span style={{fontSize: "0.8rem"}} className="text-center">соглашаюсь с <Link to='/personal_data' target="_blank">полилитикой обработки персональных данных</Link></span>
                    </Form.Label>
                </Form>
                <Row className="m-1" title={!order.customerTel ? "Необходимо ввести контактный номер телефона" : ""}>
                    <MyButton onClick={e => {
                        loading.setLoading(true)
                        placeCurrentOrder(e)
                    }} disabled={!order.customerTel || !personalData}>Отправить заказ</MyButton>
                </Row>
            </Card>
        </div>
    );
});

export default OrderSummaryBlock;