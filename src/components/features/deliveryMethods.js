import React, {useState} from 'react';
import {Card, Form} from "react-bootstrap";
import MapModal from "../modals/MapModal";

const DeliveryMethods = ({deliveryMethods, order, setCurrentDeliveryMethod, currentDeliveryMethod}) => {

    const switchDelivery = (id) => {
        deliveryMethods.forEach(d => d.id===id && setCurrentDeliveryMethod(d))
    }
    const [mapModal, setMapModal] = useState(false);
    return (
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
            <MapModal onHide={() => setMapModal(prev => !prev)} show={mapModal} />
        </div>
    );
};

export default DeliveryMethods;