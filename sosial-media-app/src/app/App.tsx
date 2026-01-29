import { RouterProvider } from "react-router-dom"
import AppRouter from "../routes/AppRouter"

function App() {
  const router = AppRouter()


  return (
    <RouterProvider router={router} />
  )
}

export default App
