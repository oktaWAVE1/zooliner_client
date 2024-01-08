import {$authHost} from "../index";

export const setProductMasterImage = async (id) => {
    const {data} = await $authHost.patch(`api/product/img`, {id})
    return data
}

export const addProductImage = async (formdata) => {
    const {data} = await $authHost.post(`api/product/img`, (formdata))
    return data
}

export const delProductImage = async (id) => {
    const {data} = await $authHost.delete(`api/product/img`, {
        params: {
            id
        }
    })
    return data
}

export const addProductCategory = async (categoryId, productId) => {
    const {data} = await $authHost.post(`api/product/category`, ({categoryId, productId}))
    return data
}

export const delProductCategory = async (categoryId, productId) => {
    const {data} = await $authHost.delete(`api/product/category`, {
        params: {
            categoryId, productId
        }
    })
    return data
}


export const addProductAttribute = async (productAttributeId, productId) => {
    const {data} = await $authHost.post(`api/product/attribute`, ({productAttributeId, productId}))
    return data
}

export const delProductAttribute = async (productAttributeId, productId) => {
    const {data} = await $authHost.delete(`api/product/attribute`, {
        params: {
            productAttributeId, productId
        }
    })
    return data
}

export const updateProduct = async ({title, shortDescription, description, weight, price, indexNumber, discountedPrice, metaTitle, metaDescription, special, hidden, published, id}) => {
    const {data} = await $authHost.put ('api/product/', {title, shortDescription, description, weight, price, indexNumber, discountedPrice, metaTitle, metaDescription, special, hidden, published, id})
    return data
}

export const fetchAllAttributeCategories = async () => {
    const {data} = await $authHost.get('api/attribute/category')
    return data
}

export const fetchAllAttributes = async () => {
    const {data} = await $authHost.get('api/attribute')
    return data
}


export const fetchAllProducts = async () => {
    const {data} = await $authHost.get('api/product/all')
    return data
}

export const fetchCurrentProduct = async (id) => {
    const {data} = await $authHost.get(`api/product/current/${id}`)
    return data
}

export const updateCurrentProductIndex = async (id, indexNumber) => {
    const {data} = await $authHost.patch(`api/product/current/${id}`, {indexNumber})
    return data
}