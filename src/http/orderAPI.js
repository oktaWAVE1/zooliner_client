import {$authHost, $host} from "./index";

export const createOrderAuth= async(userId) => {
    const data = await $authHost.post('api/order', {userId})
    return data
}

export const duplicateOrder= async(orderId, userId) => {
    const {data} = await $authHost.post(`api/basket/copy/${orderId}`, {userId})
    return data
}

export const fetchOrder = async(accessLink) => {
    const {data} = await $host.get('api/order/access/'+accessLink)
    return data
}

export const fetchCustomerOrders = async(userId) => {
    const {data} = await $authHost.get('api/order/user', { params:{
        data: {userId}
}})
    return data
}

export const fetchPaymentMethods = async() => {
    const {data} = await $host.get('api/payment')
    return data
}

export const fetchDeliveryMethods = async() => {
    const {data} = await $host.get('api/delivery')
    return data
}

export const placeOrder = async ({orderId, paymentMethodId, deliveryMethodId, name, address, telephone, bonusPoints, comment, customerEmail, userId}) => {
    const data = await $host.patch('api/order', {orderId, paymentMethodId, deliveryMethodId, name, address, telephone, bonusPoints, comment, customerEmail, userId})
    return data
}