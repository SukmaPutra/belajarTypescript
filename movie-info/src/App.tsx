import './App.css'
import { MovieProvider } from './context/MovieContext'
import Home from './pages/Home'

// getMovieDetails('tt0103359').then(data => console.log(data))




function App() {

  return (
    <>
        <MovieProvider>
          <Home />
        </MovieProvider>
    </>
  )
}

export default App
