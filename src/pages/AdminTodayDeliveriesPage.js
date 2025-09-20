import React, {useEffect, useState} from 'react';
import {Accordion, Container, Form} from "react-bootstrap";
import {fetchRealizationsToday} from "../http/admin/remoteAdminAPI";
import MyButton from "../UI/MyButton/MyButton";
import Loader from "../UI/Loader/Loader";
import Delete from "../UI/svgs/delete";

const AdminTodayDeliveriesPage = () => {
    const [realizations, setRealizations] = useState([]);
    const [update, setUpdate] = useState(0);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        fetchRealizationsToday().then(data => {
            console.log(data)
            setRealizations(data)}).finally(() => setLoading(false))
    }, [update]);
    const countSum = (realization) => {
        let sum = 0
        for (let item of realization.sellsRemotes) {
           sum += item.Сумма
        }
        let deliveryCost = (sum < realization?.deliveryRemote?.freeSum ? realization.deliveryRemote.cost : 0)
        return sum - realization.discount + deliveryCost
    }
    return (
        <Container>
            <h1 className='text-center'>Доставки сегодня:</h1>
            <div className="d-flex justify-content-center w-100 my-3">
                <MyButton onClick={()=> setUpdate(prev => prev+1)}>Обновить</MyButton>
            </div>
            {loading && <Loader />}

            {realizations.length>0 && !loading &&
                realizations.map(r =>
                    <div className="px-3 w-100" key={r.Счетчик}>
                        <div>Доставка: {r?.deliveryRemote?.name}</div>
                        <div>Клиент: {r?.customersRemote?.Имя}</div>
                        <div>Телефон:
                            {r?.customersRemote?.Телефон.replaceAll(",", "").replaceAll(";", "").replaceAll(".", "").split(" ")
                                .map((t, index) => <div key={t} className="my-2" ><a href={`tel:${t}`}>{t}</a></div>)
                            }

                        </div>
                        <div>
                            <a target="_blank" href={`https://2gis.ru/novorossiysk/search/${r?.customersRemote?.Адрес.replaceAll(" ", "%20")}?m=37.472666%2C44.997017%2F11.93`}>
                                Адрес: {r?.customersRemote?.Адрес}
                            </a>
                        </div>
                        <div><strong>Сумма: {countSum(r)}</strong></div>
                        <Accordion className="productListDeliveriesAccordion mt-1 py-0">
                            <Accordion.Item  eventKey={r.Счетчик}>
                                <Accordion.Header className="text-center w-100 mt-0 py-0"><div className="text-center w-100 mt-0 py-0">Список товара</div></Accordion.Header>
                                <Accordion.Body>
                                    {r.sellsRemotes?.length>0 &&
                                        r.sellsRemotes.map(sellItem =>
                                            <div className="d-flex justify-content-between" key={sellItem['№ реализации']}>{sellItem.Наименование} - {sellItem.Количество} шт.  <strong>{sellItem.Сумма}</strong></div>
                                        )
                                    }

                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                        <hr />
                    </div>
                )
            }

        </Container>
    );
};

export default AdminTodayDeliveriesPage;