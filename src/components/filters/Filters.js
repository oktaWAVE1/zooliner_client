import React, {useContext, useEffect} from 'react';
import BrandFilter from "./BrandFilter";
import AttributeFilter from "./AttributeFilter";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {useSearchParams} from "react-router-dom";
import {productFilter} from "../../utils/productFilter"
import {atrributeFilterUpdate} from "../../utils/atrributeFilterUpdate";
import {Accordion, Row} from "react-bootstrap";

const Filters = observer(() => {
    const {products, filters} = useContext(Context)
    const [searchParams, setSearchParams] = useSearchParams()
    let openFilters = []

    useEffect(() => {
            if (searchParams.get('attribute')) {
                let initialAttributeParams = JSON.parse(searchParams.get('attribute'))
                filters.setAttributeFilters(initialAttributeParams)
                if (initialAttributeParams) {
                    openFilters.push('1')
                }
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
                if (initialBrandParams) {
                    openFilters.push('2')
                }
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
                products.setCurrentAttributes(products.attributes)

            }
            else if(filters.brandFilters?.length>0 && Object.keys(filters.attributeFilters).length>0)    {
                let {filteredProducts, brands} = productFilter(products.products.products, filters.attributeFilters)
                products.setCurrentBrands(brands)
                products.setFilteredProducts(filteredProducts.filter(p => filters.brandFilters.includes(p.brandId)))
                products.setCurrentAttributes(products.attributes)

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
        console.log(products.products)
        console.log(filters.brandFilters)

    }, [products.products.products, filters.brandFilters, filters.attributeFilters]);
    if (products?.products?.attributes && Object.keys(products?.products?.attributes)?.length<1 && products?.products?.brands?.length<2){
        return (
            <div>

            </div>
        )
    } else {

    return (
        <Row className="Filters">

                <Accordion alwaysOpen defaultActiveKey={openFilters}>
                    {products?.products?.attributes && Object.keys(products?.products?.attributes)?.length>1 &&
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Фильтры</Accordion.Header>
                            <Accordion.Body>
                                <AttributeFilter />
                            </Accordion.Body>
                        </Accordion.Item>

                    }
                    {products?.products?.brands?.length>1 &&
                        <Accordion.Item eventKey="2">
                        <Accordion.Header>Производители</Accordion.Header>
                        <Accordion.Body>
                        <BrandFilter />
                        </Accordion.Body>
                        </Accordion.Item>
                    }

                </Accordion>



        </Row>
    );}
});

export default Filters;