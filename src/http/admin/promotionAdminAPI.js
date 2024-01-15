import {$authHost} from "../index";

export const fetchPromotions = async () => {
    const {data} = await $authHost.get('api/promotion/all')
    return data
}

export const updatePromotion= async (formdata) => {
    const {data} = await $authHost.put(`api/promotion`, (formdata))
    return data
}

export const setPromotionIndex= async ({id, index}) => {
    const {data} = await $authHost.patch(`api/promotion/index`, {id, index})
    return data
}

export const createPromotion= async (formdata) => {
    const {data} = await $authHost.post(`api/promotion`, (formdata))
    return data
}

export const deletePromotion= async (id) => {
    if(window.confirm('Точно желаете удалить акцию')) {
        const {data} = await $authHost.delete(`api/promotion`, {
            params: {
                id
            }
        })
        return data
    }
}