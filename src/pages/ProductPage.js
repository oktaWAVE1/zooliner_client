import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {fetchProduct} from "../http/catalogueAPI";
import ChildItems from "../components/ChildItems";
import MyButton from "../UI/MyButton/MyButton";
import Carousel from 'react-bootstrap/Carousel';
import Zoom from 'react-img-zoom'
import parse from 'html-react-parser';

const ProductPage = observer(() => {
    const {id} = useParams()
    const [currentProduct, setCurrentProduct] = useState({});
    const [product, setProduct] = useState({});
    const chooseChild = (id) => {
        product.children.forEach(child => child.id === id && setCurrentProduct(child))
        console.log(product.productAttribute)
    }
    useEffect(() => {
        fetchProduct(id).then(data => {

                setProduct(data)
                 if (data?.children?.length>0) {
                    setCurrentProduct(data.children.filter(c => c.published===true).sort((a, b) => b.price-a.price)[0])
                } else {
                    setCurrentProduct(data)
                }

            }

        )
    }, [id]);



    return (
        <div className="ProductPage">
            <div className="CarouselContainer">
            <Carousel controls={product?.product_images?.length>1}>
                {product?.product_images?.length>0 ?
                        product.product_images.map(i =>
                            <Carousel.Item key={i.id}>
                                <Zoom zoomScale={3} width={400} height={400} img={`${process.env.REACT_APP_API_URL}/images/products/${i.img}`} />
                            </Carousel.Item>
                        ) :
                    <Carousel.Item>

                        <img width={200} height={200} className={'noImage'}
                            src={`${process.env.REACT_APP_API_URL}/images/products/no_image.webp`}
                        />
                    </Carousel.Item>

                }

            </Carousel>
            </div>
            <div className='product'>
                <div className="content">
                    {product?.brandId === 1 && <div className="stars"><img title="рейтинг" src={`${process.env.REACT_APP_API_URL}/images/stars.png`}/><p>5.0</p></div>
                    }
                    <h3>{product?.title}</h3>
                    <h6>{product?.shortDescription}</h6>

                    <ChildItems chosenProduct={currentProduct} parentProduct={product} chooseChild={chooseChild} />
                    <MyButton classes="AddToCartButton" title="Добавить в корзину"><span className="material-symbols-outlined">
                add_shopping_cart
                </span>{currentProduct?.inStock ? "В КОРЗИНУ" : "ПОД ЗАКАЗ"}</MyButton>
                </div>
            </div>

            <div className="description">
                <hr />
                {product?.description &&

                    parse(product.description)
                }

            </div>

        </div>
    );
});

export default ProductPage;