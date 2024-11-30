import type {Post} from "~/types/post";

export interface User {
    id: number
    name: string
    avatar: string
    pubDate: string
    rating: number
    comment: string
    category: string
    email: string
    password: string
    age: number
    posts: Post[]
}