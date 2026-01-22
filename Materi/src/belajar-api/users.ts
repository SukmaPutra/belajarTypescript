import type { User } from "./type"

export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users")
        if (!response.ok) {
            throw new Error("Network response was not ok")
        }
        const data: User[] = await response.json()
        return data
        
    } catch (error) {
        throw error
    }
}

export const createUser = async (newUser: Omit<User, "id">): Promise<User> => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            })

            if (!response.ok) {
                throw new Error("Failed to create user")
            }
            return await response.json()
    } catch (error) {
        throw error
    }
}

export const updateUser = async (id:number, updatedUser: Partial<User>): Promise<User> => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedUser)
            })

            if (!response.ok) {
                throw new Error("Failed to update user")
            }
            return await response.json()
    } catch (error) {
        throw error
    }
}

export const deleteUser = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: "DELETE"
            })
            if (!response.ok){
                throw new Error("Failed to delete user")
            }

    } catch (error) {
        throw error
    }
}
