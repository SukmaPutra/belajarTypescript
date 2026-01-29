import {create} from "zustand"
import { auth } from "../api/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"


interface AuthState {
    user: {uid: string; email: string} | null
    setUser: (user: {uid: string; email: string} | null) => void
    logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => {
    //Listen to auth state changes) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
        set({user:{uid:user.uid, email:user.email || " "} })
        } else {
        set({user:null})
        }
    })
    return {
        user: null,
        setUser: (user) => set({user}),
        logout: async () => {
            signOut(auth).then(() => {
                set({user:null})
            }).catch((error) => {
                console.error("Logout failed:", error)
            })
        }
    }
})



