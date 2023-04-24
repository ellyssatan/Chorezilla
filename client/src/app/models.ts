export interface Task {
    id?: string;
    title: string;
    description: string;
    username: string
}

export interface Mail {
    email: string;
}

export interface User {
    name?: string
    email: string
    password: string
}