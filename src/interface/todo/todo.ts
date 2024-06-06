export interface Todo {
    id: number,
    title: string,
    description: string,
    dueDate: string,
    completed: boolean,
}

export interface TodoState {
    todos: Todo[],
    loading: boolean,
    error: string | null
}