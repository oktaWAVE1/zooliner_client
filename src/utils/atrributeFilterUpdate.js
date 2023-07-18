export const atrributeFilterUpdate = (products, currentAttributes, lastChange) => {
    let attributes = {}
    let attributesTemp = new Set()

    products.forEach(p => {

        p.productAttribute.forEach(a => {

            if(a.id && !attributesTemp.has(a.id) && !attributesTemp.has(a.product_attribute_category.name)){
                attributes[a.product_attribute_category.name] = [{id: a.id, name: a.value, categoryId: a.product_attribute_category.id}]
                attributesTemp.add(a.id)
                attributesTemp.add(a.product_attribute_category.name)

            } else if (a.id && !attributesTemp.has(a.id) && attributesTemp.has(a.product_attribute_category.name)) {
                attributes[a.product_attribute_category.name].push({id: a.id, name: a.value, categoryId: a.product_attribute_category.id})
                attributesTemp.add(a.id)
            }
        })


    })
    return attributes



}