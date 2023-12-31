import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useParams, useSearchParams} from "react-router-dom";
import {fetchCategoryProducts} from "../http/catalogueAPI";
import {Context} from "../index";
import ProductCard from "../components/features/ProductCard";
import {Container, Row} from "react-bootstrap";
import CategoryCard from "../components/features/CategoryCard";
import Pages from "../components/features/Pages";
import Filters from "../components/filters/Filters";
import {addToBasketDB, fetchBasket, fetchBasketUnauthorized} from "../http/basketAPI";
import {useLocalStorage} from "../hooks/useStorage";
import useDebounce from "../hooks/useDebounce";
import Loader from "../UI/Loader/Loader";
import {Helmet} from "react-helmet";
import {fetchSearchedPublishedProducts} from "../http/searchAPI";


const CategoryPage = observer(() => {
    const {products, filters, user, basket} = useContext(Context)
    const [searchParams] = useSearchParams()
    const query = (searchParams.get('query'))
    const [clicker, setClicker] = useState(0);
    const [loading, setLoading] = useState(true);
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
    }

    useEffect(() => {

        setLoading(true)
        if (id==='-1'){

            fetchSearchedPublishedProducts(query).then(data => {

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

            }).finally(() => setLoading(false))

        }  else {

            fetchCategoryProducts(id).then(data => {

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

        }).finally(() => setLoading(false))
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

    if (loading) {
        return <div>
            <Loader/>
        </div>
    } else {


    return (
        <Container className="categoryPage">
            <Filters />
            <Row id="Content">
                {products?.products?.subCategories?.length>0 ?
                products.products.subCategories.map(subCategory =>
                    <CategoryCard key={subCategory.id} category={subCategory}/>
                ) :
                products?.currentProducts?.length>0 &&
                    products.currentProducts.filter(product => product.productId===0 || !product.productId).map(product =>
                        <ProductCard addToCart={addToCart} product={product} key={product.id}/>
                    )
                }
                {!products?.products?.subCategories?.length > 0 &&
                    <Pages className="pagination"/>
                }
            </Row>
            <Helmet>
                <title>{`${products.products?.category?.description} | ЗооЛАЙНЕР`}</title>
            </Helmet>
        </Container>
    );
    }
});

export default CategoryPage;