import BlogList from "./pages/BlogList";
import BlogCreateEdit from "./pages/BlogCreateEdit";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BlogDetaill from "./pages/BlogDetaill";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <BlogList />,
    },
    {
      path: "/create",
      element: <BlogCreateEdit mode="create" />,
    },
    {
      path: "/blog/:id/edit",
      element: <BlogCreateEdit mode="edit" />,
    },
    {
      path: "/blog/:id",
      element: <BlogDetaill />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
