import {$authHost} from "../index";

export const fetchAllUsers = async () => {
    const {data} = await $authHost.get('api/user')
    return data
}

export const postBonus = async ({userId, qty, comment}) => {
    const {data} = await $authHost.post('/api/bonus', {userId, qty, comment})
    return data
}

export const setRole = async ({userId, role}) => {
    if(window.confirm('Точно желаете изменить роль пользователя?')) {
        const {data} = await $authHost.patch('api/user/modify', {userId, role})
        return data
    }
}

export const setEmailActivation = async ({userId, isActivated}) => {
    if(window.confirm('Точно желаете изменить активацию email?')) {
        const {data} = await $authHost.patch('api/user/activate_email', {userId, isActivated})
        return data
    }
}