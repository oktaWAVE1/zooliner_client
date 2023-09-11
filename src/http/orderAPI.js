import {$authHost, $host} from "./index";

export const createOrderAuth= async(userId) => {
    const data = await $authHost.post('api/order', {userId})
    return data
}

export const fetchOrder = async(accessLink) => {
    const data = await $host.get('api/order/'+accessLink)
    return data
}

export const fetchPaymentMethods = async() => {
    const data = await $host.get('api/payment')
    return data
}

export const fetchDeliverytMethods = async() => {
    const data = await $host.get('api/delivery')
    return data
}