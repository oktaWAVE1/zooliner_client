import React, {useState} from 'react';
import {Alert, Card, Form} from "react-bootstrap";
import MapModal from "../modals/MapModal";
import Map from "../../UI/svgs/map"

const DeliveryMethods = ({deliveryMethods, order, setCurrentDeliveryMethod, currentDeliveryMethod}) => {
    const [alertMessage, setAlertMessage] = useState({title: '', message: '', show: false, variant:''})
    const switchDelivery = (id, minSum) => {
        if(order.discountedSalesSum >= minSum){
            deliveryMethods.forEach(d => d.id===id && setCurrentDeliveryMethod(d))
        } else {
            setAlertMessage({title: '', message: `Минимальная сумма заказа в эту зону ${minSum} ₽`, show: true, variant:'danger'})
        }
    }
    const [mapModal, setMapModal] = useState(false);
    return (
        <div className="delivery_methods">
            <Card>
                <h3>Выберите способ доставки:</h3>
                {alertMessage.show &&
                    <Alert className='mt-0' variant={alertMessage.variant} onClose={() => setAlertMessage({...alertMessage, show: false})} dismissible>
                        <Alert.Heading>{alertMessage.title}</Alert.Heading>
                        <p className="mb-0 px-0">
                            {alertMessage.message}
                        </p>
                    </Alert>
                }
                {deliveryMethods.length>0 &&
                    <Form id="DeliveryMethods">
                        {deliveryMethods.sort((a,b) => a.id-b.id).map(d =>
                            <Form.Check type="switch" id={d.id} label={d.name} key={`${d.id}`}  checked={d.id===currentDeliveryMethod.id} onChange={() => switchDelivery(d.id, d.minSum)}
                                        title={order.discountedSalesSum < d.minSum ? `Минимальная сумма заказа для доставки: ${d.minSum} р.` : "Способ доставки"}
                            />
                        )
                        }
                        <span onClick={() => setMapModal(prev => !prev)} className="pointer delivery_zones"><div className='mapModal'><Map /><span>зоны доставки</span></div></span>
                    </Form>

                }
            </Card>
            <MapModal onHide={() => setMapModal(prev => !prev)} show={mapModal} />
        </div>
    );
};

export default DeliveryMethods;