import {$authHost, $host} from "./index";



export const fetchAllBrands = async () => {
    const {data} = await $authHost.get('api/brand/all')
    return data
}


export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', {name: brand.name, id: brand.id})
    return data
}


export const modifyBrand = async (id, published) => {
    const {data} = await $authHost.put('api/brand', {id, published})
    return data
}


export const deleteBrand = async (id) => {
    if(window.confirm('Точно желаете удалить?')) {
        const {data} = await $authHost.delete('api/brand', {
                params: {
                    id
                }
            }
        )
        return data
    }
    return false
}