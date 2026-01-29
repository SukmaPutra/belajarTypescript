import { auth,  } from './firebase'
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

//Sign Up Function
export const signup = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return userCredential.user
}

//LoginFunction
export const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
}

//Logout Function
export const logout = async (): Promise<void> => {
    await signOut(auth)
}