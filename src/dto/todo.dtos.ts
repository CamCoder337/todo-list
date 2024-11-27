export type TodoStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
export interface TodoBase {
    title: string;
    description: string;
    priority: number;
}

export interface TodoCreate extends TodoBase {
    status: TodoStatus
}

export interface Todo extends TodoCreate {
    id: string;
}