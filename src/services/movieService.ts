import axios from "axios";
import type { Movie } from "../types/movie";


interface MoviesHttpResponse {
    results: Movie[];
    total_pages: number;
}

export async function fetchMovies(query: string, currentPage: number) {
    const response = await axios.get<MoviesHttpResponse>('https://api.themoviedb.org/3/search/movie', {
        params: {
            query: query,
            page: currentPage,
        },
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        }
    });
    return response.data;
} 