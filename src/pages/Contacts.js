import React from 'react';
import {GeolocationControl, Map, Placemark, YMaps, ZoomControl} from "@pbe/react-yandex-maps";
import {Container} from "react-bootstrap";

const Contacts = () => {
    const apikey = process.env.YANDEX_API_KEY || '032045a0-47c7-4d5d-9335-a1940576d3b2'
    return (
        <Container className="ContactsPage">
            <h1>Контакты:</h1>
            <div>Адрес: г-к. Анапа, улица Парковая 60/1</div>
            <div>Телефон <a href="tel:+79184958513">+7 (918) 495-85-13</a></div>
            <div>Email: <a href="mailto:zooliner@ya.ru">zooliner@yandex.ru</a></div>
            <div>Режим работы: Ежедневно 10:00 - 20:00. Без перерыва.</div>
            <YMaps query={{ apikey:apikey }}>
                <div className='w-100 mt-3'>
                    <Map  defaultState={{ center: [44.890610, 37.336893], zoom: 16 }} width={"100%"} height="300px" >
                        <ZoomControl options={{ float: "right" }} />
                        <Placemark geometry={[44.890726, 37.336979]}
                                   options={{preset: "islands#dotIcon",
                                       iconColor: "#fe5117"
                                   }}
                                   properties={{
                                        iconCaption: "ЗооЛАЙНЕР",

                                   }} />
                        <GeolocationControl options={{ float: "left" }} />
                    </Map>
                </div>
            </YMaps>
            <div className="mt-3 text-center">ИП Косыгин Сергей Валерьевич. ИНН 245803520818.  ОГРНИП 317246800107966.</div>
        </Container>
    );
};

export default Contacts;