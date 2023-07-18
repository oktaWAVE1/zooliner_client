import {$authHost, $host} from './index'


export const createLesson = async(lesson) => {
    const {data} = await $authHost.post('api/lessons', (lesson))
    return data

}

export const fetchPublishedLessons = async() => {
    const {data} = await $authHost.get('api/lessons')
    return data
}

export const fetchAllLessons = async() => {
    const {data} = await $authHost.get('api/lessons/all')
    return data
}

export const updateLesson = async (id, name, description, published, lessonTypeId) => {
    const {data} = await $authHost.post('api/lessons/edit', {id, name, description, published, lessonTypeId})
    return data
}

export const deleteLesson = async (id, fileName) => {
    if(window.confirm('Точно удалить?')) {
        const {data} = await $authHost.post('api/lessons/delete', {id, fileName})
        return data
    }
    return false
}

