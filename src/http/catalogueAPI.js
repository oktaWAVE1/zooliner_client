import {$host} from "./index";


export const fetchCategoryItems= async() => {
    const {data} = await $host.get('api/category')
    return data
}

export const fetchCategoryProducts = async(id) => {
    const {data} = await $host.get('api/product/in_category/'+id)
    return data
}

export const fetchProduct = async(id) => {
    const {data} = await $host.get('api/product/item/'+id)
    return data
}