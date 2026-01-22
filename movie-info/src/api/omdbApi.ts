

const API_KEY = 'afa387f3'
const BASE_URL = 'http://www.omdbapi.com/'

// Function to fetch movie data by title
export const searchMovies = async(query: string) => {
    const response = await fetch(`${BASE_URL}?s=${query}&apikey=${API_KEY}`)

    const data = await response.json()

    return data.Search
}

// Function to fetch movie details by ID
export const getMovieDetails = async(id: string) => {
    const response = await fetch(`${BASE_URL}?i=${id}&apikey=${API_KEY}`)

    const data = await response.json()

    return data
}
