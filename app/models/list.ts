import uuid from 'react-native-uuid'

export interface List {
    id: string,
    title: string,
    createdAt: string,
    updatedAt: string
}

export const createListForm = (title: string) => {
    return {
        id: uuid.v4(),
        title,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
}