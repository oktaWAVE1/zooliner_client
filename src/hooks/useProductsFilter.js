import {useMemo} from "react";

export const useProductsFilter = (products, brandFilters) => {


    const filteredProducts = useMemo(() => {
        console.log(typeof (brandFilters))
        if(brandFilters)
        {
            console.log("1")
            return ({products: products.filter(p => brandFilters.includes(p.brandId)), total: products?.length}
            )
        }
        else {
            console.log("2")
            console.log(products)
            return ({products})
        }
    }, [products, brandFilters])
    return filteredProducts
}