import React from 'react';
import {Card, Form} from "react-bootstrap";

const PaymentMethods = ({paymentMethods, currentPaymentMethod, switchPayment}) => {
    return (
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
    );
};

export default PaymentMethods;