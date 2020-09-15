export interface User {
    user_id: number,
    email: string,
    username: string,
    password: string,
    roles_id: number,
    role_name: string,
    avatar?: string,
    createdAt: Date
}

export interface Role {
    role_id: number,
    role_name: string
}

export interface Tag {
    tag_id: number,
    tag_name: string
}

export interface Category {
    category_id: number,
    category_name: string
}

export interface Post {
    post_id: number,
    title: string,
    description: string,
    content: string,
    image?: string,
    categories_id: number,
    category_name: string
    createdAt: Date
}

export interface Bookmark {
    bookmark_id: number,
    posts_id: number
}

export interface Comment {
    comment_id: number,
    posts_id: number,
    comment: string
}

export interface Message {
    message: string
}