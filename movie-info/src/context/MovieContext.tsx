import { createContext, useContext, useState, type ReactNode } from "react";
import { getMovieDetails, searchMovies } from "../api/omdbApi";

export interface Movie {
    title: string;
    year: string;
    description: string;
    poster: string;
    imdbID: string;
}

export interface MovieDetails extends Movie {
    Plot: string;
    Genre: string;
    Director: string;
    Released: string;
    Actors: string;
    imdbRating: { Source: string; Value: string }[];
}

interface MovieContextType {
    movies: Movie[];
    selectedMovie: MovieDetails | null;
    searchMovies: (query: string) => Promise<void>;
    selectMovie: (id: string) => Promise<void>;
    closeMovie: () => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

type MovieProviderProps = {
    children: ReactNode;
}

export const MovieProvider = ({children}: MovieProviderProps) => {
    //state dari movies
    const [movies, setMovies] = useState<Movie[]>([]);

    //selected movie 
    const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);

    const searchMoviesHandler = async (query: string) => {
         const result = await searchMovies(query);

        // API OMDb mengembalikan 'Title', 'Poster', dll. 
        // Kita harus mengubahnya menjadi 'title', 'poster', dll.
        const mappedMovies = result?.map((movie: any) => ({
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image",
            imdbID: movie.imdbID,
            plot: movie.Plot || '',
            description: movie.Plot || '',
            actors: movie.Actors || '',
            genre: movie.Genre || '',
            director: movie.Director || '',
            released: movie.Released || '',
            imdbRating: movie.Ratings || [],

        })) || [];

            setMovies(mappedMovies);
    };

    const selectMovieHandler = async (id: string) => {
        const movieDetails = await getMovieDetails(id);
            setSelectedMovie(movieDetails);        
    }

    const closeMovieHandler = () => {
        setSelectedMovie(null);
    }   
    return (<MovieContext.Provider value={{
            movies,
            selectedMovie,
            searchMovies: searchMoviesHandler,
            selectMovie: selectMovieHandler,
            closeMovie: closeMovieHandler,
        }}>
        {children}
    </MovieContext.Provider>
    
    );
}

//custom hook untuk usecontext
export const useMovieContext = () => {
    const context = useContext(MovieContext);
    if (context === undefined) {
        throw new Error("useMovieContext must be used within a MovieProvider");
    }
    return context;
}