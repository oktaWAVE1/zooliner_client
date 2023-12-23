import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchProduct} from "../http/catalogueAPI";
import {Helmet} from "react-helmet";
import ProductImageCarousel from "../components/features/productImageCarousel";
import ProductContent from "../components/features/ProductContent";

const ProductPage = () => {
    const {id} = useParams()
    const [product, setProduct] = useState({});
    const [currentProduct, setCurrentProduct] = useState({});

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

            <ProductImageCarousel product={product} />
            <ProductContent
                product={product}
                setCurrentProduct={setCurrentProduct}
                currentProduct={currentProduct}/>
            <Helmet>
                <title>{`${product?.title} ${product?.shortDescription} | Зоолайнер`}</title>
            </Helmet>
        </div>
    );
};

export default ProductPage;