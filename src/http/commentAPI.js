import {$authHost, $host} from "./index";

export const createComment = async (comment) => {
    const {data} = await $authHost.post('api/comments', {comment: comment})
    return data
}

export const fetchPublishedComments= async() => {
    const {data} = await $host.get('api/comments/published')
    return data
}

export const fetchAllComments= async() => {
    const {data} = await $authHost.get('api/comments')
    return data
}


export const updateComment = async (id, viewed, published) => {
    const {data} = await $authHost.post('api/comments/update', {viewed: viewed, published: published, id: id})
    return data
}

export const deleteComment = async (id) => {
    if(window.confirm('Точно удалить?')){
        const {data} = await $authHost.post('api/comments/delete', {id: id})
        return data}
    return false
}