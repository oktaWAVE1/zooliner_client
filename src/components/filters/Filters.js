import React, {useContext, useEffect} from 'react';
import BrandFilter from "./BrandFilter";
import AttributeFilter from "./AttributeFilter";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {useSearchParams} from "react-router-dom";
import {productFilter} from "../../utils/productFilter"
import {atrributeFilterUpdate} from "../../utils/atrributeFilterUpdate";

const Filters = observer(() => {
    const {products, filters} = useContext(Context)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
            if (searchParams.get('attribute')) {
                let initialAttributeParams = JSON.parse(searchParams.get('attribute'))
                filters.setAttributeFilters(initialAttributeParams)
            }
            filters.setAttributeCheckedFilters([])
            for (const category in filters.attributeFilters) {
                for (let i = 0; i<filters.attributeFilters[category].length; i++) {
                    filters.setAttributeCheckedFilters([...filters.attributeCheckedFilters, filters.attributeFilters[category][i]])
                }
        }
            if (searchParams.get('brand')) {
                let initialBrandParams = Array.from(searchParams.get('brand').split('_'), Number)
                filters.setBrandFilters(initialBrandParams)
            }
    }, [products.attributes, products.brands]);

    useEffect(() => {
        setSearchParams(`brand=${filters.brandFilters.join("_")}&attribute=${JSON.stringify(filters.attributeFilters)}`)
    }, [filters.attributeFilters, filters.brandFilters]);

    useEffect(() => {
        if (products?.products?.products){
            if(filters.brandFilters?.length<1 && Object.keys(filters.attributeFilters).length>0)    {
                let {filteredProducts, brands} = productFilter(products.products.products, filters.attributeFilters)
                products.setFilteredProducts(filteredProducts)
                products.setCurrentBrands(brands)
            }
            else if(filters.brandFilters?.length>0 && Object.keys(filters.attributeFilters).length>0)    {
                let {filteredProducts, brands} = productFilter(products.products.products, filters.attributeFilters)
                products.setCurrentBrands(brands)
                products.setFilteredProducts(filteredProducts.filter(p => filters.brandFilters.includes(p.brandId)))

            }
            else if (filters.brandFilters?.length>0 && Object.keys(filters.attributeFilters).length<1) {
                products.setCurrentBrands(products.brands)
                products.setFilteredProducts([...products?.products?.products].filter(p => filters.brandFilters.includes(p.brandId)))
                products.setCurrentAttributes(atrributeFilterUpdate(products.filteredProducts))
            }
            else if (products?.products?.products){
                products.setCurrentBrands(products.brands)
                products.setCurrentAttributes(products.attributes)
                products.setFilteredProducts([...products?.products?.products])
            }
            products.setPage(1)
            products.setTotalCount(products.filteredProducts.length)
        }

    }, [products.products.products, filters.brandFilters, filters.attributeFilters]);

    return (
        <div>
            <BrandFilter />
            <AttributeFilter />
        </div>
    );
});

export default Filters;