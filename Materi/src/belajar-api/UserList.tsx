import { useEffect, useState } from "react"
import type { User } from "./type"
import { getUsers, createUser, updateUser, deleteUser } from "./users"

const UserList = () => {
    const [users, setUsers] = useState<User[]>([])  
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data: User[] = await getUsers()
                setUsers(data)
            } catch (error: any) {
                setError(error.message)
            } finally {
                setLoading(false)
            }   
        }
        fetchUsers()
    }, [])


    const handleCreateUser = async () => {
        
        const newUser: Omit<User, "id"> = {
            name: "New User",
            username: "newuser",
            email: "newuser@example.com"
        }
        
        try{
            
            const createdUser: User = await createUser(newUser)
            setUsers(prevUsers => [...prevUsers, createdUser])
        } catch (error: any) {
            setError(error.message)
        }
    }

    const handleUpdateUser = async (id: number) => {
        const updatedUser: Partial<User> = {
            id: id,
            name: "Updated User",
            email: "Updateemail@example.com",
            username: "updateduser"
        }
        try {

            const updatedUserData: User = await updateUser(id, updatedUser)
            setUsers(prevUsers => prevUsers.map(user => user.id === id ? updatedUserData : user))
        } catch (error: any) {
            setError(error.message)
        }
    }

    const handleDeleteUser = async (id: number) => {
        try {
            await deleteUser(id)
            setUsers(prevUsers => prevUsers.filter(users=>users.id !==id))
        } catch (error: any) {
            setError(error.message)
        }
    }
    
    if (loading) {
        return <div className="flex justify-center items-center h-screen"><h1 className="text-xl font-semibold">Loading...</h1></div>
    }
    if (error) {
        return <div className="flex justify-center items-center h-screen"><h1 className="text-xl font-semibold text-red-500">Error: {error}</h1></div>
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">User List</h1>
            <div className="mb-6 text-center">
                <button onClick={handleCreateUser} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition duration-200">Add User</button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {users.map(user => (
                    <div key={user.id} className="bg-white shadow-md rounded-lg p-4 border">
                        <h2 className="text-lg font-semibold mb-2">{user.name}</h2>
                        <p className="text-gray-600 mb-4">{user.email}</p>
                        <div className="flex space-x-2">
                            <button onClick={() => handleUpdateUser(user.id)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-medium transition duration-200">Update</button>
                            <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium transition duration-200">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default UserList