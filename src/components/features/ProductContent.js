import React, {useContext, useState} from 'react';
import ChildItems from "./ChildItems";
import MyButton from "../../UI/MyButton/MyButton";
import parse from "html-react-parser";
import {addToBasketDB, fetchBasket, fetchBasketUnauthorized} from "../../http/basketAPI";
import useDebounce from "../../hooks/useDebounce";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useLocalStorage} from "../../hooks/useStorage";
import AddShoppingCart from "../../UI/svgs/addShoppingCart";

const ProductContent = observer(({product, setCurrentProduct, currentProduct}) => {

    const [quantity, setQuantity] = useState(1);
    const {user, basket} = useContext(Context)
    const [clicker, setClicker] = useState(0);
    const [localBasket, setLocalBasket] = useLocalStorage('basket', [])
    useDebounce(() => user.isAuth ?
            fetchBasket(user.user.id).then(data => basket.setBasketItems(data)) : fetchBasketUnauthorized(JSON.stringify(localBasket)).then(data => basket.setBasketItems(data)),
        500, [localBasket, clicker])

    const increaseQty = () => {
        setQuantity(prev => prev+1)
    }
    const decreaseQty = () => {
        setQuantity(prev => prev-1)
    }
    const chooseChild = (id) => {
        product.children.forEach(child => child.id === id && setCurrentProduct(child))
    }

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
    return (
        <>
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
                <MyButton onClick={() => addToCart(currentProduct.id, quantity)} classes="AddToCartButton" title="Добавить в корзину"><AddShoppingCart />{currentProduct?.inStock ? "В КОРЗИНУ" : "ПОД ЗАКАЗ"}</MyButton>
            </div>
        </div>

    <div className="description">
        <hr />
        {product?.description &&

            parse(product.description)
        }

    </div>
        </>
    );
});

export default ProductContent;