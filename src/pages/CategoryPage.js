import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {fetchCategoryProducts} from "../http/catalogueAPI";
import {Context} from "../index";
import ProductCard from "../components/ProductCard";
import {Container, Row} from "react-bootstrap";
import CategoryCard from "../components/CategoryCard";
import Pages from "../components/Pages";
import Filters from "../components/filters/Filters";
import attributeFilter from "../components/filters/AttributeFilter";

const CategoryPage = observer(() => {
    const {products, filters} = useContext(Context)
    const {id} = useParams()

    useEffect(() => {

        fetchCategoryProducts(id).then(data => {
                products.setPage(1)
                products.setProducts(data)
                products.setBrands(data.brands)
                products.setAttributes(data.attributes)
                filters.setAttributeFilters({})
                filters.setBrandFilters([])
                if(products?.products?.products?.length>0){
                    products.setTotalCount(products.products.products.length)
                }
        })
    }, [id]);
    useEffect(() => {
        if(products?.products?.products){
            let from = products.page*products.limit-products.limit
            let to = from+products.limit>products.totalCount ? products.totalCount : from+products.limit
            products.setCurrentProducts(products.filteredProducts.slice(from,to))

        }
    }, [products.page, products.filteredProducts]);


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
                        <ProductCard product={product} key={product.id}/>
                    )
                }
                {!products?.products?.subCategories?.length > 0 &&
                    <Pages className="pagination"/>
                }
            </Row>
        </Container>
    );
});

export default CategoryPage;