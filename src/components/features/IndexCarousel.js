import React from 'react';
import {Link} from "react-router-dom";
import {Carousel} from "react-bootstrap";

const IndexCarousel = ({promotion}) => {
    return (
        <Carousel pause={'hover'} touch={true} controls={promotion?.length>1} variant={'dark'}>
            {promotion?.length>0 &&
                promotion.map((p, index) =>
                    <Carousel.Item key={p.id}>
                        {p?.link?.length>0 ?
                            <Link to={p.link}><img className="promotion_img" alt="promotion_img" src={`${process.env.REACT_APP_API_URL}/images/promotions/${p.img}`} /></Link> :
                            <img loading={index>0 ? "lazy" : "eager"} className="promotion_img" alt="promotion_img" src={`${process.env.REACT_APP_API_URL}/images/promotions/${p.img}`} />
                        }

                    </Carousel.Item>
                )
            }

        </Carousel>
    );
};

export default IndexCarousel;