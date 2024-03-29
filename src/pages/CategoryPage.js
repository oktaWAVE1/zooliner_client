import React, {useContext, useState, Suspense, useLayoutEffect, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {useParams, useSearchParams} from "react-router-dom";
import {fetchCategoryProducts} from "../http/catalogueAPI";
import {Context} from "../index";
import {Container, Row} from "react-bootstrap";
import {addToBasketDB, fetchBasket, fetchBasketUnauthorized} from "../http/basketAPI";
import {useLocalStorage} from "../hooks/useStorage";
import useDebounce from "../hooks/useDebounce";
import Loader from "../UI/Loader/Loader";
import {fetchSearchedPublishedProducts} from "../http/searchAPI";
import Page404 from "./404/Page404";

const Pages = React.lazy(() => import('../components/features/Pages'));
const Filters = React.lazy(() => import('../components/filters/Filters'));
const CategoryCard = React.lazy(() => import('../components/features/CategoryCard'));
const ProductCard = React.lazy(() => import('../components/features/ProductCard'));
const Helmet = React.lazy(() => import('react-helmet'));


const CategoryPage = observer(() => {
    const {products, filters, user, basket, loading} = useContext(Context)
    const [failed, setFailed] = useState(false);
    const [searchParams] = useSearchParams()
    const query = (searchParams.get('query'))
    const [clicker, setClicker] = useState(0);
    const {id} = useParams()
    const [localBasket, setLocalBasket] = useLocalStorage('basket', [])
    useDebounce(() => user.isAuth ?
            fetchBasket(user.user.id).then(data => basket.setBasketItems(data)) : fetchBasketUnauthorized(JSON.stringify(localBasket)).then(data => basket.setBasketItems(data)),
        500, [localBasket, clicker])
    const addToCart = (productId) => {
        if (user.isAuth){
            addToBasketDB(user.user.id, 1, productId).then(() => setClicker(prev => prev+1))
        } else {
            if(localBasket?.length===0){
                setLocalBasket([{qty: 1, productId: productId}])
            } else {
                for (let i=0; i<localBasket.length; i++){
                    if(localBasket[i]['productId']===productId){
                        setLocalBasket(localBasket.toSpliced(i, 1, {qty: localBasket[i]['qty']+1, productId: productId}))
                        return
                    }
                }
                setLocalBasket([...localBasket, {qty: 1, productId: productId}])
                return
            }
        }
        if(document){
            const cart = document.getElementById("BasketBlock")
            cart.classList.add('shake')
            setTimeout(()=> {
                cart.classList.remove('shake')
            },400)
        }
    }
    const setData = (data) => {
        products.setProducts(data)
        products.setBrands(data.brands)
        products.setAttributes(data.attributes)
        filters.setAttributeFilters({})
        filters.setBrandFilters([])
        products.setCurrentAttributes([])
        products.setCurrentBrands([])
        if(products?.products?.products?.length>0){
            products.setTotalCount(products.products.products.length)
        }
    }

    useEffect(() => {
        if (id==='-1'){
            fetchSearchedPublishedProducts(query).then(data => {
                setData(data)
            }).finally(() => loading.setLoading(false))

        }  else {
            fetchCategoryProducts(id).then(data => {
              setData(data)
        })
                .catch(() => {
            setFailed(true)
            })
                .finally(() => loading.setLoading(false))
    }
    },
    [id, query]);
    useDebounce(() => {
        if(products?.products?.products){
            let from = products.page*products.limit-products.limit
            let to = from+products.limit>products.totalCount ? products.totalCount : from+products.limit
            products.setCurrentProducts(products.filteredProducts.slice(from,to))
        }
    }, 100, [products.page, products.filteredProducts]);

    if (loading.loading) {
        return <div>
            <Loader/>
        </div>
    } else if(failed){
        return <Page404 />
    } else {


    return (
        <Container className="categoryPage">
            <Suspense fallback={<Loader />}>
                <Filters/>
            </Suspense>
            <h2 className="mb-2 text-uppercase">{products.products?.category?.description.replace('.', '')}</h2>
            <Row id="Content">
                {products?.products?.subCategories?.length>0 ?

                products.products.subCategories.map(subCategory =>
                    <Suspense key={subCategory.id} fallback={<Loader />}>
                        <CategoryCard category={subCategory}/>
                    </Suspense>
                ) :
                products?.currentProducts?.length>0 &&
                    products.currentProducts.filter(product => product.productId===0 || !product.productId).map(product =>
                        <Suspense key={product.id} fallback={<Loader />}>
                            <ProductCard addToCart={addToCart} product={product} />
                        </Suspense>
                    )
                }
            </Row>
            <div className='w-100 d-flex justify-content-center'>
                {!products?.products?.subCategories?.length > 0 &&
                    <Suspense>
                        <Pages className="pagination"/>
                    </Suspense>
                }
            </div>
            <Suspense>
                <Helmet>
                    {id==="0" ?
                        <title>{`Каталог товаров для животных | ЗооЛАЙНЕР`}</title>
                        : id==="-1"
                            ?<title>{`Поиск товаров для животных | ЗооЛАЙНЕР`}</title>
                            :<title>{`${products.products?.category?.description} | ЗооЛАЙНЕР`}</title>
                    }
                    {id === "0" ?
                        <meta name="description"
                              content={`Каталог товаров для животных в интернет-магазине ЗооЛАЙНЕР`}/>
                        : id === "-1" ?
                            <meta name="description"
                                  content={`Поиск товаров для животных в интернет-магазине ЗооЛАЙНЕР`}/>
                            : <meta name="description"
                                    content={`Купить ${products.products?.category?.description}  в интернет-магазине ЗооЛАЙНЕР`}/>
                    }


                    <meta property="og:title" content={`${products.products?.category?.description} | ЗооЛАЙНЕР`} />
                    {products.products?.category?.category_images?.length>0 &&
                            <meta property="og:image" content={`${process.env.REACT_APP_API_URL}/images/categories/mini/${products.products?.category?.category_images[0].img}`} />
                    }

                    <meta property="og:description" content="Товары для животных с доставкой в день заказа | ЗооЛАЙНЕР" />
                    <meta property="og:url" content={`${process.env.REACT_APP_URL}/category/${id}?query=${query}`} />

                </Helmet>
            </Suspense>
        </Container>
    );
    }
});

export default CategoryPage;