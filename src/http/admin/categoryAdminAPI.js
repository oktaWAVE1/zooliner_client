import {$authHost} from "../index";

export const fetchAllCategories = async () => {
    const {data} = await $authHost.get('api/category/all')
    return data
}



export const fetchCurrentCategory = async (id) => {
    const {data} = await $authHost.get(`api/category/current/${id}`)
    return data
}

export const createCategory = async (category) => {
    const {data} = await $authHost.post('api/category', (category))
    return data
}

export const modifyCategory = async (category) => {
    const {data} = await $authHost.put('api/category', (category))
    return data
}


export const deleteCategory = async (id) => {
    if(window.confirm('Точно желаете удалить?')) {
        const {data} = await $authHost.delete('api/category', {
                params: {
                    id
                }
            }
        )
        return data
    }
    return false
}

export const addCategoryImage = async (categoryImage) => {
    const {data} = await $authHost.post('api/category/img', (categoryImage))
    return data
}

export const deleteCategoryImage = async ({id}) => {
    if(window.confirm('Точно желаете удалить?')) {
        const {data} = await $authHost.delete('api/category/img', {
                params: {
                    id
                }
            }
        )
        return data
    }
    return false
}