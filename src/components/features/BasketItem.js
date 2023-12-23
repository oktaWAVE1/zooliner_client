import React, {useState} from 'react';
import useDebounce from "../../hooks/useDebounce";
import {fetchBasket, updateBasketItemQtyDB} from "../../http/basketAPI";
import {Link} from "react-router-dom";

const BasketItem = ({item, user, basket, delBasketItem, localBasket, setLocalBasket, ...props}) => {

    const [quantity, setQuantity] = useState(item.qty);

    useDebounce(() => user.isAuth ?
        updateBasketItemQtyDB(user.user.id, quantity, item.product.id).then(() =>
             fetchBasket(user.user.id).then(data => basket.setBasketItems(data))) : updateQty(),
        1200, [quantity])

    const updateQty = () => {
        for (let i = 0; i < localBasket.length; i++) {
            if (localBasket[i]['productId'] === item.productId) {
                setLocalBasket(localBasket.toSpliced(i, 1, {
                    qty: quantity,
                    productId: item.productId
                }))
            }
        }

    }

    const increaseQty = () => {
        setQuantity(prev => prev+1)
        console.log(item.product)
    }
    const decreaseQty = () => {
        setQuantity(prev => prev-1)
    }


    return (
        <div className="basketItem">
            <div className="basketItemImg">
                <img loading="lazy" src={`${process.env.REACT_APP_API_URL}/images/products/mini/${item.product?.parent?.product_images[0]?.img ?? item.product?.product_images[0]?.img ?? "no_image.webp"}`}/>
            </div>
            <div className='basketItemLink d-flex justify-content-start w-100'>
                {item?.product?.parent?.title ? <Link to={`/product/${item.product.parent.id}`}>{item.product.parent.title} {item.product.parent.shortDescription} {item.product.title}</Link> :<Link to={`/product/${item.product.id}`}>{item.product.title} {item.product.shortDescription}</Link>}

            </div>
            <div className="qtyBar">
                <button className="QtyBtn DcrBtn" onClick={() => decreaseQty()}>-</button>
                <input type='number' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                <button className="QtyBtn IncrBtn" onClick={() => increaseQty()}>+</button>
            </div>

            <div>
                {item.product.discountedPrice>0 ? <span><div className="oldPrice">{item.product.price}</div><div className="newPrice">{item.product.discountedPrice}</div></span>: <span className="Price">{item.product.price}</span>}
            </div>
            <div>
                {item.product.discountedPrice>0 ? <span><div className="oldPrice">{item.product.price*quantity}</div><div className="newPrice">{item.product.discountedPrice*quantity}</div></span>: <span className="Price">{item.product.price*quantity}</span>}
            </div>
            <div>
                <button className="DelItemBtn" onClick={() => delBasketItem(item.product.id)} title="Удалить из корзины"><span
                    className="material-symbols-outlined">
delete
</span></button>
                {!item.product.inStock && <span title='Под заказ' className="notInStock pointer material-symbols-outlined">
                                                package_2
                                          </span>}
            </div>
        </div>
    );
};

export default BasketItem;