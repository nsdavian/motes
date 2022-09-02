import uuid from 'react-native-uuid'

export interface Todo {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    description?: string;
    isCompleted?: boolean;
    isImportant?: boolean;
    list?: string;
}

export const createTodoFormTitle = (title: string) => {
    return {
        id: uuid.v4(),
        title,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
}