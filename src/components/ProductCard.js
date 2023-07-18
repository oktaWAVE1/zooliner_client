import React, {useEffect, useState} from 'react';
import {Card} from "react-bootstrap";
import MyButton from "../UI/MyButton/MyButton";
import ChildItems from "./ChildItems";
import {Link} from "react-router-dom";

const ProductCard = ({product}) => {
    const [currentProduct, setCurrentProduct] = useState({});
    useEffect(() => {

        if (product?.children.length>0) {
            setCurrentProduct(product.children.filter(c => c.published===true).sort((a, b) => b.price-a.price)[0])
        } else {
            setCurrentProduct(product)
        }


    }, []);

    const chooseChild = (id) => {
        product.children.forEach(child => child.id === id && setCurrentProduct(child))
    }

    return (
        <Card className="ProductCard">
            {product.brandId === 1 && <div className="stars" ><img title="рейтинг" src={`${process.env.REACT_APP_API_URL}/images/stars.png`}/><p>5.0</p></div>
            }
            <Link to={`/product/${product.id}`}>
            <img loading="lazy" src={`${process.env.REACT_APP_API_URL}/images/products/mini/${product.product_images[0]?.img ? product.product_images[0]?.img : "no_image.webp"}`}/>
            </Link>
            <div><div>
                <Link to={`/product/${product.id}`}>
                    <h4>{product.title}</h4>
                </Link>
                <p>{product.shortDescription}</p>
            </div>
                <div>

                   <ChildItems chooseChild={chooseChild} chosenProduct={currentProduct} parentProduct={product} />
                   <MyButton classes="AddToCartButton" title="Добавить в корзину"><span className="material-symbols-outlined">
                    add_shopping_cart
                    </span>{currentProduct.inStock ? "В КОРЗИНУ" : "ПОД ЗАКАЗ"}</MyButton>
                </div>
           </div>
        </Card>
    );
};

export default ProductCard;