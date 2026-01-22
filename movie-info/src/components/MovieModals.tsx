import { useMovieContext } from "../context/MovieContext"


const MovieModals = () => {
  const {selectedMovie, closeMovie} = useMovieContext()

  if (!selectedMovie) return null

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg max-w-lg w-full">
        <img className="w-full h-auto rounded-lg mb-4 object-cover max-h-60" 
          src={selectedMovie.Poster} 
          alt={selectedMovie.Title} />

        <h2 className="text-2xl font-bold mb-2">{selectedMovie.Title} ({selectedMovie.Year})</h2>
        <p className="mb-2"><strong>IMDB Rating:</strong> {selectedMovie.imdbRating}</p>
        <p className="mb-2"><strong>Genre:</strong> {selectedMovie.Genre}</p>
        <p className="mb-2"><strong>Released:</strong> {selectedMovie.Released}</p>
        <p className="mb-2"><strong>Director:</strong> {selectedMovie.Director}</p>
        <p className="mb-2"><strong>Actors:</strong> {selectedMovie.Actors}</p>
        <p className="mb-4"><strong>Plot:</strong> {selectedMovie.Plot}</p>

        <button onClick={closeMovie} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Close</button>
      </div>
    </div>
  )
}

export default MovieModals
