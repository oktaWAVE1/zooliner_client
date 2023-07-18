import {$authHost, $host} from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', {name: type})
    return data
}

export const fetchTypes = async() => {
    const {data} = await $host.get('api/type')
    return data
}

export const updateType = async (id, name) => {
    const {data} = await $authHost.post('api/type/modify', {name: name, id: id})
    return data
}

export const deleteType = async (id) => {
    if(window.confirm('Точно удалить?')){
    const {data} = await $authHost.post('api/type/delete', {id: id})
    return data}
    return false
}