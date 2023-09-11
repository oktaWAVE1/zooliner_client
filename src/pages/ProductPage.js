import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {fetchProduct} from "../http/catalogueAPI";
import ChildItems from "../components/ChildItems";
import MyButton from "../UI/MyButton/MyButton";
import Carousel from 'react-bootstrap/Carousel';
import Zoom from 'react-img-zoom'
import parse from 'html-react-parser';
import {addToBasketDB, fetchBasket, fetchBasketUnauthorized} from "../http/basketAPI";
import {useLocalStorage} from "../hooks/useStorage";
import {Context} from "../index";
import useDebounce from "../hooks/useDebounce";
import {Helmet} from "react-helmet";

const ProductPage = observer(() => {
    const {id} = useParams()
    const {user, basket} = useContext(Context)
    const [currentProduct, setCurrentProduct] = useState({});
    const [clicker, setClicker] = useState(0);
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);

    const increaseQty = () => {
        setQuantity(prev => prev+1)
    }
    const decreaseQty = () => {
        setQuantity(prev => prev-1)
    }
    const chooseChild = (id) => {
        product.children.forEach(child => child.id === id && setCurrentProduct(child))
    }
    const [localBasket, setLocalBasket] = useLocalStorage('basket', [])
    const addToCart = (productId, qty) => {
        if (user.isAuth){
            addToBasketDB(user.user.id, qty, productId).then(() => setClicker(prev => prev+1))
        } else {
            if(localBasket?.length===0){
                setLocalBasket([{qty: qty, productId: productId}])
            } else {
                for (let i=0; i<localBasket.length; i++){
                    if(localBasket[i]['productId']===productId){
                        setLocalBasket(localBasket.toSpliced(i, 1, {qty: localBasket[i]['qty']+qty, productId: productId}))
                        return
                    }
                }
                setLocalBasket([...localBasket, {qty: qty, productId: productId}])
            }
        }
    }

    useDebounce(() => user.isAuth ?
            fetchBasket(user.user.id).then(data => basket.setBasketItems(data)) : fetchBasketUnauthorized(JSON.stringify(localBasket)).then(data => basket.setBasketItems(data)),
        500, [localBasket, clicker])
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

                        <img width={200} height={200} className='noImage' alt='noImage'
                            src={`${process.env.REACT_APP_API_URL}/images/products/no_image.webp`}
                        />
                    </Carousel.Item>

                }

            </Carousel>
            </div>
            <div className='product'>
                <div className="content">
                    {product?.brandId === 1 && <div className="stars"><img alt={product?.title} title="рейтинг" src={`${process.env.REACT_APP_API_URL}/images/stars.png`}/><p>5.0</p></div>
                    }
                    <h3>{product?.title}</h3>
                    <h6>{product?.shortDescription}</h6>
                    <div className="qtyBar">
                        <button className='DcrBtn QtyBtn' onClick={() => decreaseQty()}>-</button>
                        <input type='number' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        <button className='IncrBtn QtyBtn' onClick={() => increaseQty()}>+</button>
                    </div>
                    <ChildItems chosenProduct={currentProduct} parentProduct={product} chooseChild={chooseChild} />
                    <MyButton onClick={() => addToCart(currentProduct.id, quantity)} classes="AddToCartButton" title="Добавить в корзину"><span className="material-symbols-outlined">
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
            <Helmet>
                <title>{`${product?.title} ${product?.shortDescription} | Зоолайнер`}</title>
            </Helmet>
        </div>
    );
});

export default ProductPage;