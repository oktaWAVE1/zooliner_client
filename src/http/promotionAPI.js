import {$host} from "./index";

export const fetchCurrentPromotions= async() => {
    const {data} = await $host.get('api/promotion')
    return data
}