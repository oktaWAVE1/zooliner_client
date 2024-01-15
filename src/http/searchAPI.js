import {$host} from "./index";

export const fetchPublishedProducts= async() => {
    const {data} = await $host.get('api/product')
    return data
}

export const fetchSearchedPublishedProducts = async(query) => {
    const {data} = await $host.get('api/product/search/'+query)
    return data
}