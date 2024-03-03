import {$authHost} from "../index";

export const fetchAllProductStocks = async () => {
    const {data} = await $authHost.get('api/remote/products')
    return data
}

export const fetchRealizationsToday = async() => {
    const {data} = await $authHost.get(`api/remote/today_deliveries`)
    return data
}
