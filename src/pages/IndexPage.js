import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {fetchCurrentPromotions} from "../http/promotionAPI";
import {Link} from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

const IndexPage = observer(() => {
    const [promotion, setPromotion] = useState([]);
    useEffect(() => {
        fetchCurrentPromotions().then(data => setPromotion(data))

    }, []);

    return (
        <div>
        <Row className="mx-3">
            <div className="index_slider">
                       <Carousel pause={'hover'} touch={true} controls={promotion?.length>1} variant={'dark'}>
                    {promotion?.length>0 &&
                        promotion.map(p =>
                            <Carousel.Item key={p.id}>
                                {p?.link?.length>0 ?
                                    <Link to={p.link}><img className="promotion_img" alt="promotion_img" src={`${process.env.REACT_APP_API_URL}/images/promotions/${p.img}`} /></Link> :
                                    <img className="promotion_img" alt="promotion_img" src={`${process.env.REACT_APP_API_URL}/images/promotions/${p.img}`} />
                                }

                            </Carousel.Item>
                        )
                    }

                </Carousel>
            </div>
            <div className="index_top_banner"><Link to={'/royal'}><img alt="royal_banner" loading="lazy" src={`${process.env.REACT_APP_API_URL}/images/royal/Cat_Royal.png`} /></Link></div>
        </Row>

            <Helmet>
                <meta property="og:title" content="ЗооЛАЙНЕР" />
                <meta property="og:image" content="https://zooliner.ru/" />
                <meta property="og:description" content="Товары для животных в Анапе. Интернет-магазин для ваших любимцев." />

                <title>Товары для животных в Анапе. Интернет-магазин для ваших любимцев | ЗооЛАЙНЕР</title>
            </Helmet>
        </div>
    );
});

export default IndexPage;