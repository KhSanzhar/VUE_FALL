import {defineStore} from "pinia";
import {users as staticUsers} from "~/values/users";
import type {User} from "~/types/user";

export const useUsers = defineStore('users', () => {
    const allUsers = ref([
        ...staticUsers
    ])

    const getUsersByCategory = (category: string) => {
        return allUsers.value.filter(user => user.category === category)
    }

    const sortUsersByRating = (users: User[]) => {
        return users.sort((a, b) => b.rating - a.rating)
    }

    return {
        allUsers,
        getUsersByCategory,
        sortUsersByRating,
    }
})