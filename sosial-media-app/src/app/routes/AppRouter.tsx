import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Login from "../../features/auth/pages/LoginPage";
import Signup from "../../features/auth/pages/SignupPage";
import PostPage from "../pages/PostPage";
import ProfilePage from "../pages/ProfilePage";
import CreateProfilePage from "../pages/CreateProfilePage";
import NotFound from "../pages/NotFound";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        { path: "/post/:postId", element: <PostPage /> },
        { path: "/profile/:userId", element: <ProfilePage /> },
        { path: "/create-profile/form", element: <CreateProfilePage /> },
        { path: "/not-found", element: <NotFound /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);
  return router;
};

export default AppRouter;
