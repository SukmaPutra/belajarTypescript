import { useMovieContext } from '../context/MovieContext'
import MovieCard from './MovieCard'

const MovieList = () => {
   
    const {movies, selectMovie } = useMovieContext();

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6'>
       {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} 
        onClick={() => selectMovie(movie.imdbID)} />
       ))}
    </div>
  )
}

export default MovieList
