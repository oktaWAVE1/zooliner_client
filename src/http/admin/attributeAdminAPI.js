import {$authHost} from "../index";

export const fetchAllAttributes = async () => {
    const {data} = await $authHost.get('api/attribute/category')
    return data
}


export const createAttributeCategory = async (name) => {
    const {data} = await $authHost.post('api/attribute/category', {name})
    return data
}

export const createAttribute = async ({productAttributeCategoryId, value}) => {
    const {data} = await $authHost.post('api/attribute', {productAttributeCategoryId, value})
    return data
}


export const modifyAttribute = async ({id, value}) => {
    const {data} = await $authHost.put('api/attribute', {id, value})
    return data
}

export const modifyAttributeCategory = async ({id, name, published}) => {
    const {data} = await $authHost.put('api/attribute/category', {id, name, published})
    return data
}


export const deleteAttribute = async (id) => {
    if(window.confirm('Точно желаете удалить?')) {
        const {data} = await $authHost.delete('api/attribute', {
                params: {
                    id
                }
            }
        )
        return data
    }
    return false
}

export const deleteAttributeCategory = async (id) => {
    if(window.confirm('Точно желаете удалить?')) {
        const {data} = await $authHost.delete('api/attribute/category', {
                params: {
                    id
                }
            }
        )
        return data
    }
    return false
}