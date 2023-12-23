import React from 'react';
import Carousel from "react-bootstrap/Carousel";
import Zoom from "react-img-zoom";

const ProductImageCarousel = ({product}) => {
    return (
        <div className="CarouselContainer">
            <Carousel controls={product?.product_images?.length>1}>
                {product?.product_images?.length>0 ?
                    product.product_images.map(i =>
                        <Carousel.Item key={i.id}>
                            <Zoom zoomScale={3} width={400} height={400} img={`${process.env.REACT_APP_API_URL}/images/products/${i.img}`} />
                        </Carousel.Item>
                    ) :
                    <Carousel.Item>
                        <img width={200} height={200} className='noImage' alt='noImage'
                             src={`${process.env.REACT_APP_API_URL}/images/products/no_image.webp`}
                        />
                    </Carousel.Item>
                }
            </Carousel>
        </div>
    );
};

export default ProductImageCarousel;