import {  useContext } from "react"
import { ThemeContext } from "./ThemeContex"

const KomponenD = () => {
    const themeContext = useContext(ThemeContext)
    if (!themeContext) {
        throw new Error("ThemeContext is undefined, make sure you are using ThemeProvider"); 
    }

    const {theme, changeTheme} = themeContext;

  return (
    <button onClick={changeTheme} className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-800 transition">
      {theme}
    </button>
  )
}
export default KomponenD