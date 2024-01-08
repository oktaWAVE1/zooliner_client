import {$authHost} from "../index";

export const fetchStatuses = async () => {
    const {data} = await $authHost.get('api/order/status')
    return data
}

export const updateStatus = async ({id, status}) => {
    const {data} = await $authHost.patch(`api/order/status/${id}`, {status})
    return data
}