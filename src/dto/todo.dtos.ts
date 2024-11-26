export interface TodoBase {
    title: string;
    description: string;
    priority: number;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}

export interface TodoCreate extends TodoBase {
    status: 'TODO' | 'IN_PROGRESS' | 'DONE'
}

export interface Todo extends TodoCreate {
    id: number;
}