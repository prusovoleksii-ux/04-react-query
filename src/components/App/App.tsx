import { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import toast, { Toaster } from 'react-hot-toast';
import { fetchMovies } from '../../services/movieService';
import MovieGrid from '../MovieGrid/MovieGrid';
import type { Movie } from '../../types/movie';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Pagination from '../Pagination/Pagination';

export default function App() {

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const {data, isLoading, isError, isSuccess} = useQuery({
    queryKey: ['list', query, currentPage],
    queryFn: () => fetchMovies(query, currentPage),
    enabled: query !== '',
    placeholderData: keepPreviousData,
  });
  const totalPages = data?.total_pages ?? 0;
  
  const handleSubmit = async (query: string) => {
    setQuery(query);
    setCurrentPage(1);
  }

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  }

  const handleClose = () => {
    setSelectedMovie(null);
  }

  useEffect(() => {
    if (isSuccess && data.results.length === 0) toast.error("No movies found.") 
  }, [isSuccess, data?.results.length]);

  return (
    <>
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleClose}/>}
      <Toaster/>
      <SearchBar onSubmit={handleSubmit}/>
      {isLoading && <Loader/>}
      {isError && <ErrorMessage/>}
      {isSuccess && totalPages > 1 && 
        <Pagination
          totalPages={totalPages}
          page={currentPage}
          setPage={setCurrentPage}
        />
      }
      {data && data.results.length > 0 && 
        <MovieGrid movies={data.results} onSelect={handleSelect} />
      }
    </>
  );
}

