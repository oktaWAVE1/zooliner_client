import {$authHost, $host} from "./index";

export const addToBasketDB= async(userId, qty=1, productId) => {
    const data = await $authHost.post('api/basket', {userId, qty, productId})
    return data
}

export const deleteBasketItemDB= async(userId, productId) => {
    const data = await $authHost.delete('api/basket', {
        params: {userId, productId}
})
    return data
}

export const updateBasketItemQtyDB= async(userId, qty, productId) => {

    const data = await $authHost.put('api/basket', {userId, qty, productId})
    return data
}

export const fetchBasket= async(id) => {
    const {data} = await $authHost.get('api/basket', {
    params: {id}
    })
    return data
}

export const fetchBasketUnauthorized= async(localBasket) => {
    const {data} = await $host.get('api/basket/unauthorized', {
        params: {localBasket}
    })
    return data
}

export const clearBasketDB= async(id) => {
    const {data} = await $authHost.delete('api/basket/clear', {
        params: {id}
    })
    return data
}