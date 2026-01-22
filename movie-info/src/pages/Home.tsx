import SearchBar from '../components/SearchBar'
import MovieList from '../components/MovieList'
import MovieModals from '../components/MovieModals'
import { useMovieContext } from '../context/MovieContext'


function Home() {
  const {movies, selectedMovie} = useMovieContext()
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <SearchBar />
      {movies.length > 0 ? <MovieList /> : <p className="text-center mt-10 text-gray-400">No movies found</p>}

      {selectedMovie && <MovieModals />}
    </div>
  )
}

export default Home
