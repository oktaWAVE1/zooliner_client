import {useMemo} from "react";

export const useProductStockSearch = (products, searchQuery) => {
    const searchedUsers = useMemo(() => {
        if(searchQuery.length>0){
            return (products.filter(product =>
                (product?.Наименование && product.Наименование.toLowerCase().includes(searchQuery.toLowerCase()))
                || (product?.['Наименование (крат опис)'] && product['Наименование (крат опис)'].toLowerCase().includes(searchQuery.toLowerCase()))
                || (String(product.Код)===String(searchQuery))
            ))
        }
        else {
            return (products)
        }
    }, [searchQuery, products])
    return searchedUsers
}