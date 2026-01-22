import { useState } from "react";
import { useMovieContext } from "../context/MovieContext"


const SearchBar = () => {
    const {searchMovies} = useMovieContext()
    const [query, setQuery] = useState<string>('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()){
            searchMovies(query);
        }
    }    

  return (
    <form  onSubmit={handleSubmit} className='flex items-center w-full mb-4 bg-amber-50 p-4 rounded-lg shadow-sm'>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)} 
        type="text" 
        placeholder="Search for movies..." 
        className='flex-1 px-3 py-2 border text-black border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
      />
      <button 
        type="submit" 
        className='px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition-colors'
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar

