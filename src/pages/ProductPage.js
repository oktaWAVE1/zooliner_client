import React, {Suspense, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {fetchProduct} from "../http/catalogueAPI";
import {Helmet} from "react-helmet";
import ProductContent from "../components/features/ProductContent";
import Loader from "../UI/Loader/Loader";
const ProductImageCarousel = React.lazy(() => import('../components/features/productImageCarousel'));

const ProductPage = () => {
    const {id} = useParams()
    const [product, setProduct] = useState({});
    const [currentProduct, setCurrentProduct] = useState({});
    const navigate = useNavigate()


    useEffect(() => {
        fetchProduct(id).then(data => {
                if(data===null){
                    navigate(-1)
                }
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
            <Suspense fallback={<Loader />}>
                <ProductImageCarousel product={product} />
            </Suspense>
            <ProductContent
                product={product}
                setCurrentProduct={setCurrentProduct}
                currentProduct={currentProduct}/>
            <Helmet>
                <title>{`${product?.title} ${product?.shortDescription} | Зоолайнер`}</title>
                <meta property="og:title" content={`${product?.title} | Зоолайнер`} />
                {product?.product_images?.length>0  &&
                    <meta property="og:image" content={`${process.env.REACT_APP_API_URL}/images/products/${product.product_images[0].img}`} />
                }
                <meta property="og:description" content={`${product?.shortDescription} | ЗооЛАЙНЕР`} />
                <meta property="og:url" content={`${process.env.REACT_APP_URL}/product/${id}`} />
            </Helmet>
        </div>

    );
};

export default ProductPage;