import React, {useContext, useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {Container, Row} from "react-bootstrap";
import {CarouselProvider, Slide, Slider} from "pure-react-carousel";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchCurrentPromotions} from "../http/promotionAPI";
import {Link} from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Zoom from "react-img-zoom";

const IndexPage = observer(() => {
    const [promotion, setPromotion] = useState([]);
    useEffect(() => {
        fetchCurrentPromotions().then(data => setPromotion(data))

    }, []);

    return (
        <div>
        <Row>
            <div className="index_slider">
                       <Carousel pause={'hover'} touch={true} controls={promotion?.length>1} variant={'dark'}>
                    {promotion?.length>0 &&
                        promotion.map(p =>
                            <Carousel.Item key={p.id}>
                                <img  src={`${process.env.REACT_APP_API_URL}/images/promotions/${p.img}`} />
                            </Carousel.Item>
                        )
                    }

                </Carousel>
            </div>
            <div className="index_top_banner"><Link to={'/royal'}><img loading="lazy" src={`${process.env.REACT_APP_API_URL}/images/royal/Cat_Royal.png`} /></Link></div>
        </Row>

            <Helmet>
                <title>Товары для животных в Анапе. Интернет-магазин для ваших любимцев | Зоолайнер</title>
            </Helmet>
        </div>
    );
});

export default IndexPage;