import {$authHost} from "../index";

export const fetchAllUsers = async () => {
    const {data} = await $authHost.get('api/user')
    return data
}

export const postBonus = async ({userId, qty, comment}) => {
    const {data} = await $authHost.post('/api/bonus', {userId, qty, comment})
    return data
}