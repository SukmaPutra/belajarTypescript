type MovieCardProps = {
  movie: {
    title: string;
    description: string;
    year: string;
    poster: string;
    imdbID: string;
  }
  onClick: () => void;
}

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  return (
    <div onClick={onClick} className='bg-gray-900 text-white rounded-lg shadow-md overflow-hidden'>
      <img 
        src={movie.poster} 
        alt={movie.title}
        className='w-full h-48 object-cover '
      />
      <h3 className='p-4 text-lg font-semibold'>{movie.title}</h3>
        <p className='p-4 text-gray-400'>{movie.year}</p>
    </div>
  )
}

export default MovieCard
