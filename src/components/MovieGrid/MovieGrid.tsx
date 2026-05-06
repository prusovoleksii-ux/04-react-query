import type { Movie } from "../../types/movie";
import styles from "./MovieGrid.module.css";

interface MovieGridProps {
    onSelect: (movie: Movie) => void;
    movies: Movie[];
}

export default function MovieGrid(props: MovieGridProps) {

    return (
        <ul className={styles.grid}>
            {props.movies.length > 0 && props.movies.map((movie) => (
                <li key={movie.id} onClick={() => props.onSelect(movie)}>
                    <div className={styles.card}>
                    <img 
                            className={styles.image} 
                            src= {`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            loading="lazy" 
                        />
                        <h2 className={styles.title}>{movie.title}</h2>
                    </div>
                </li>
            ))}
        </ul>
    )
}