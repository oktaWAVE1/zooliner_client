import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {fetchRealizationsToday} from "../http/admin/remoteAdminAPI";

const AdminTodayDeliveriesPage = () => {
    const [realizations, setRealizations] = useState([]);
    useEffect(() => {
        fetchRealizationsToday().then(data => {
            console.log(data)
            setRealizations(data)})
    }, []);
    return (
        <Container>
            <h1 className='text-center'>Доставки сегодня:</h1>

            {realizations.length>0 &&
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

                        <hr />
                    </div>
                )
            }

        </Container>
    );
};

export default AdminTodayDeliveriesPage;