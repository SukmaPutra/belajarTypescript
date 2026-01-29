import { createBrowserRouter, Navigate } from "react-router-dom"
import Layout from "../components/layout/Layout"
import Home from "../pages/Home"
import Login from "../pages/LoginPage"
import Signup from "../pages/SignupPage"
import PostPage from "../pages/PostPage"
import ProfilePage from "../pages/ProfilePage"
import CreateProfilePage from "../pages/CreateProfilePage"
import CreateAvatarPage from "../pages/CreateAvatarPage"
import NotFound from "../pages/NotFound"



const AppRouter = () => {
    const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {path: "/", element: <Home />},
            {path: "/login", element: <Login />},
            {path: "/signup", element: <Signup />},
            {path: "/post/:userid", element: <PostPage />},
            {path: "/profile/:userid", element: <ProfilePage />},
            {path: "/create-profile/form", element: <CreateProfilePage />},
            {path: "/create-profile/avatar", element: <CreateAvatarPage />},
            {path: "/not-found", element: <NotFound />},
        ]
        
    },
    {
        path: "*",
        element : <Navigate to='/' replace/>
    }
  ])
  return (
    router
  )
}

export default AppRouter
