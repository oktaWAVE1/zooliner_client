export const productFilter = (products, filterItems) => {

    let filteredProducts = []
    let brands = []
    let brandsTemp = new Set()

        if (Object.keys(filterItems).length>0) {
            let i = 1
            let current = [...products]

            for (const f in filterItems) {

                if (filterItems[f].length > 0) {
                    for (let i = 0; i < current?.length; i++) {
                        if (current[i]['productAttribute'].length > 0) {
                            for (let j = 0; j < current[i]['productAttribute'].length; j++) {
                                if (current[i]['productAttribute'][j]['id']) {
                                    if (filterItems[f].includes(current[i]['productAttribute'][j]['id'])) {
                                        filteredProducts.push(current[i])
                                        break
                                    }
                                }
                            }
                        }
                    }
                }



                if (i<Object.keys(filterItems).length){
                    current = [...filteredProducts]
                    filteredProducts = []
                    }
                i++
            }
            filteredProducts.forEach(p => {
                if (p.brandId && !brandsTemp.has(p.brandId)) {
                    brandsTemp.add(p.brandId)
                    brands.push({id: p.brandId, name: p.brand.name})

                }
            })
                return {filteredProducts, brands}
        }
        return {filteredProducts: products, brands: products.brands}
}