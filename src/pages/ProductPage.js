import React, {Suspense, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {fetchProduct} from "../http/catalogueAPI";
import {Helmet} from "react-helmet";
import ProductContent from "../components/features/ProductContent";
import Loader from "../UI/Loader/Loader";
import Page404 from "./404/Page404";
const ProductImageCarousel = React.lazy(() => import('../components/features/productImageCarousel'));

const ProductPage = () => {
    const {id} = useParams()
    const [product, setProduct] = useState({});
    const [currentProduct, setCurrentProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [failed, setFailed] = useState(false);


    useEffect(() => {
        setLoading(true)
        fetchProduct(id).then(data => {

                setProduct(data)
                 if (data?.children?.length>0) {
                    setCurrentProduct(data.children.filter(c => c.published===true).sort((a, b) => b.price-a.price)[0])
                } else {
                    setCurrentProduct(data)
                }
            }
        ).catch(() => {
            setFailed(true)
        }).finally(() => setLoading(false))
    }, [id]);
    if (loading.loading) {
        return <div>
            <Loader/>
        </div>
    } else if(failed){
        return <Page404 />
    } else {

    return (


        <div itemType="https://schema.org/Product" itemScope  className="w-100">
            <meta itemProp="name" content={product?.brand?.name}/>
            {product?.product_images?.length>0  &&
                <meta itemProp="image" content={`${process.env.REACT_APP_API_URL}/images/products/${product.product_images[0].img}`} />
            }

            <div className="ProductPage" itemProp="offers" itemScope itemType="http://schema.org/Offer">
                <meta itemProp="description" content={(product.description)} />
                <meta itemProp="availability" content="https://schema.org/InStock"/>
                <meta itemProp="priceCurrency" content="RUR"/>
                <meta itemProp="itemCondition" content="https://schema.org/NewCondition"/>
                <meta itemProp="price" content={currentProduct?.discountedPrice ? currentProduct?.discountedPrice : currentProduct?.price}/>

                <Suspense fallback={<Loader />}>
                    <ProductImageCarousel product={product} />
                </Suspense>
                <ProductContent
                    product={product}
                    setCurrentProduct={setCurrentProduct}
                    currentProduct={currentProduct}/>

            </div>
            <Helmet>

                <title>{`${product?.title ? product?.title : ''} ${product?.shortDescription ? product?.shortDescription : ''} | Зоолайнер`}</title>}

                <meta property="og:title" content={`${product?.title} | Зоолайнер`} />
                {product?.product_images?.length>0  &&
                    <meta property="og:image" content={`${process.env.REACT_APP_API_URL}/images/products/${product.product_images[0].img}`} />
                }
                <meta property="og:description" content={`${product?.shortDescription} | ЗооЛАЙНЕР`} />
                <meta property="og:url" content={`${process.env.REACT_APP_URL}/product/${id}`} />
                <meta name="description" content={`Купить ${product?.title} ${product?.shortDescription} в интернет-магазине ЗооЛАЙНЕР`} />


            </Helmet>
        </div>

    );
}};

export default ProductPage;