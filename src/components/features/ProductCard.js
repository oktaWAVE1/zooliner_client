import React, {useEffect, useState} from 'react';
import {Card} from "react-bootstrap";
import MyButton from "../../UI/MyButton/MyButton";
import ChildItems from "./ChildItems";
import {Link} from "react-router-dom";
import AddShoppingCart from "../../UI/svgs/addShoppingCart";

const   ProductCard = ({product, addToCart, preview}) => {
    const [currentProduct, setCurrentProduct] = useState({});
    useEffect(() => {

        if (product?.children?.length>0) {
            let sortedChildren = product.children.filter(c => c.published===true && c.inStock).toSorted((a, b) => b.price-a.price)
            if (sortedChildren.length === 0){
                sortedChildren = product.children.filter(c => c.published===true).toSorted((a, b) => b.price-a.price)
            }
            setCurrentProduct(sortedChildren[0])
        } else {
            setCurrentProduct(product)
        }


    }, []);

    const chooseChild = (id) => {
        product.children.forEach(child => child.id === id && setCurrentProduct(child))
    }


    return (
        <Card itemType="https://schema.org/Product" itemScope className="ProductCard">
            {product.brandId === 1 && <div className="stars" ><img alt="rating" title="рейтинг" src={`${process.env.REACT_APP_API_URL}/images/stars.png`}/><p>5.0</p></div>
            }
            <Link itemProp="url" to={`/product/${product.id}`}>
                <img itemProp="image" alt="product_img" loading="lazy" src={`${process.env.REACT_APP_API_URL}/images/products/mini/${product?.product_images[0]?.img ? product.product_images[0]?.img : "no_image.webp"}`}/>
            </Link>
            <div><div>
                <meta itemProp="name" content={`${product.title.toUpperCase()} ${product.shortDescription}`} />
                <Link to={`/product/${product.id}`}>
                    <h4>{product.title.toUpperCase()}</h4>
                </Link>
                <p>{product.shortDescription}</p>
            </div>
                <div itemProp="offers">
                   <meta itemProp="availability" content="https://schema.org/InStock"/>
                   <meta itemProp="priceCurrency" content="RUR"/>
                   <meta itemProp="itemCondition" content="https://schema.org/NewCondition"/>
                   <meta itemProp="price" content={currentProduct?.price}/>

                   <ChildItems preview={preview} chooseChild={chooseChild} chosenProduct={currentProduct} parentProduct={product} />
                   <MyButton disabled={preview} onClick={() => addToCart(currentProduct.id)} classes="AddToCartButton">
                       <span>
                       <AddShoppingCart />
                        </span>{currentProduct?.inStock ? "В КОРЗИНУ" : "ПОД ЗАКАЗ"}</MyButton>
                </div>
           </div>
        </Card>
    );
};

export default ProductCard;