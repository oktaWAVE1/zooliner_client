import {useMemo} from "react";

export const useProductsSortSearch = (products, searchQuery, filters, sort) => {

    const searchedProducts = useMemo(() => {

        let sortedProducts = []
        if(sort==='id'){
            sortedProducts = [...products].sort((a,b) => (a.id) - (b.id))
        } else if (sort==='name'){
            sortedProducts = [...products]
        } else if (sort==='index'){
            sortedProducts = [...products].sort((a,b) => (a.indexNumber) - (b.indexNumber))
        }


        let filteredProducts = [...sortedProducts]
        if (filters?.published?.length>0){
            if (filters.published==='true'){
                filteredProducts = [...filteredProducts].filter(p => p.published===true)
            } else {
                filteredProducts = [...filteredProducts].filter(p => p.published!==true)
            }
        }

        if (filters?.hidden?.length>0){
            if (filters.hidden==='true'){
                filteredProducts = [...filteredProducts].filter(p => p.hidden===true)
            } else {
                filteredProducts = [...filteredProducts].filter(p => p.hidden!==true)
            }
        }

        if (filters?.hasImages?.length>0){
            if (filters.hasImages==='true'){
                filteredProducts = [...filteredProducts].filter(p => p?.product_images?.length>0)
            } else {
                filteredProducts = [...filteredProducts].filter(p => !p?.product_images?.length>0)
            }
        }

        if (filters?.inStock?.length>0){
            if (filters.inStock==='true'){
                filteredProducts = [...filteredProducts].filter(p => p.inStock===true)
            } else {
                filteredProducts = [...filteredProducts].filter(p => p.inStock!==true)
            }
        }

        if (filters?.special?.length>0){
            if (filters.special==='true'){
                filteredProducts = [...filteredProducts].filter(p => p.special===true)
            } else {
                filteredProducts = [...filteredProducts].filter(p => p.special!==true)
            }
        }

        if (filters?.brandId!==0){
            filteredProducts = [...filteredProducts].filter(p => Number(p.brandId)===Number(filters.brandId))
        }
        if (filters?.categoryId!==0){
            filteredProducts = [...filteredProducts].filter(p => p.categories.includes(filters.categoryId))
        }
        if(searchQuery){
            return (filteredProducts.filter(p => (p?.title && p.title.toLowerCase().includes(searchQuery.toLowerCase()))
                || (p.shortDescription && p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()))
                || (p?.parent?.title && p.parent.title.toLowerCase().includes(searchQuery.toLowerCase()))
                || (p?.parent?.shortDescription && p.parent.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()))
                || (p?.brand?.name && p.brand.name.toLowerCase().includes(searchQuery.toLowerCase()))
                || String(p.id).includes(searchQuery.toLowerCase())
            ))
        }
        else {
            return (filteredProducts)
        }
    }, [products, searchQuery, filters, sort])
    return searchedProducts
}