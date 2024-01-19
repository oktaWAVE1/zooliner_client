import React, {useEffect, useState, Suspense} from 'react';
import {Helmet} from "react-helmet";
import {Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {fetchCurrentPromotions} from "../http/promotionAPI";
import {Link} from "react-router-dom";
import Loader from "../UI/Loader/Loader";
const IndexCarousel = React.lazy(() => import('../components/features/IndexCarousel'));

const IndexPage = observer(() => {
    const [promotion, setPromotion] = useState([]);
    useEffect(() => {
        fetchCurrentPromotions().then(data => setPromotion(data))

    }, []);

    return (
        <div>
        <Row className="mx-3">
            <div className="index_slider">
                <Suspense fallback={<Loader />}>
                       <IndexCarousel promotion={promotion} />
                </Suspense>
            </div>
            <div className="index_top_banner"><Link to={'/royal'}><img alt="royal_banner" loading="lazy" src={`${process.env.REACT_APP_API_URL}/images/royal/Cat_Royal.png`} /></Link></div>
        </Row>

            <Helmet>
                <meta property="og:title" content="ЗооЛАЙНЕР" />
                <meta property="og:image" content="https://zooliner.ru/" />
                <meta property="og:description" content="Товары для животных в Анапе. Интернет-магазин для ваших любимцев." />
                <meta name="description" content={`Интернет-магазин товаров для Ваших любимцев в Анапе. ЗооЛАЙНЕР.`} />
                <title>Товары для животных в Анапе. Интернет-магазин для ваших любимцев | ЗооЛАЙНЕР</title>
            </Helmet>
        </div>
    );
});

export default IndexPage;