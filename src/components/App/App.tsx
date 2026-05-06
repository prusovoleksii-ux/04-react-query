import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import toast, { Toaster } from 'react-hot-toast';
import { fetchMovies } from '../../services/movieService';
import MovieGrid from '../MovieGrid/MovieGrid';
import type { Movie } from '../../types/movie';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

export default function App() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const handleSubmit = async (query: string) => {
    setIsError(false);
    setMovies([]);
    setIsLoading(true);
    
    try {
      const movieList = await fetchMovies(query);

      if (movieList.length < 1) {
        setIsError(true);
        toast.error('No movies found for your request.');
      } else setMovies(movieList);

    } catch {
      setIsError(true);
      toast.error('An error has occured.');

    } finally {setIsLoading(false);}
  }

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  }

  const handleClose = () => {
    setSelectedMovie(null);
  }

  return (
    <>
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleClose}/>}
      {isLoading && <Loader/>}
      {isError && <ErrorMessage/>}
      <Toaster/>
      <SearchBar onSubmit={handleSubmit}/>
      <MovieGrid movies={movies} onSelect={handleSelect}/>
    </>
  );
}

