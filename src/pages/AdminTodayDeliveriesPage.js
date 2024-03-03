import React, {useEffect, useState} from 'react';
import {Accordion, Container} from "react-bootstrap";
import {fetchRealizationsToday} from "../http/admin/remoteAdminAPI";

const AdminTodayDeliveriesPage = () => {
    const [realizations, setRealizations] = useState([]);
    useEffect(() => {
        fetchRealizationsToday().then(data => {
            console.log(data)
            setRealizations(data)})
    }, []);
    const [accordionKey, setAccordionKey] = useState("1");
    return (
        <Container>
            <h1 className='text-center'>Доставки сегодня:</h1>

            {realizations.length>0 &&
                realizations.map(r =>
                    <div key={r.Счетчик}>
                        <div>Доставка: {r?.deliveryRemote?.name}</div>
                        <div>Клиент: {r?.customersRemote?.Имя}</div>
                        <div>Телефон:
                            {r?.customersRemote?.Телефон.replaceAll(",", "").replaceAll(".", "").split(" ")
                                .map((t, index) => <div key={t} className="my-2" ><a href={`"tel:${t}"`}>{t}</a></div>)
                            }

                        </div>
                        <div>Адрес: {r?.customersRemote?.Адрес}</div>
                        <hr />
                    </div>
                )
            }


        </Container>
    );
};

export default AdminTodayDeliveriesPage;