import { Link, useSearchParams } from "react-router-dom";
import useMovies from "../hooks/useMovies.js";
import styles from "./MoviePage.module.css";
import noPoster from "../assets/no_poster.svg";

export default function MoviePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const { movies, loading, error } = useMovies(query);

  return (
    <main className="page">
      <h1>Movies</h1>

      <label className={styles.searchLabel} htmlFor="movie-search">
        Search for a movie
      </label>

      <input
        id="movie-search"
        className={styles.movieSearch}
        type="search"
        value={query}
        onChange={(event) => {
          const value = event.target.value;

          if (value) {
            setSearchParams({ query: value }, { replace: true });
          } else {
            setSearchParams({}, { replace: true });
          }
        }}
        placeholder="For example, Dune"
      />

      {loading && <p>Searching for movies...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && query.trim() && movies.length === 0 && (
        <p>No movies found. Try another search.</p>
      )}

      {!query.trim() && <p>Enter a movie title to start searching.</p>}

      <div className={styles.searchResults}>
        {movies.map((movie) => (
          <Link
            className={styles.searchResult}
            key={movie.id}
            to={
              query
                ? `/movies/${movie.id}?query=${encodeURIComponent(query)}`
                : `/movies/${movie.id}`
            }
          >
            {movie.poster_path ? (
              <img
                className={styles.poster}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`Poster for ${movie.title}`}
                loading="lazy"
              />
            ) : (
              <img
                className={styles.poster}
                src={noPoster}
                alt={`Poster unavailable for ${movie.title}`}
                loading="lazy"
              />
            )}

            <h2>{movie.title}</h2>
            <p>
              {movie.release_date?.slice(0, 4) || "Release year unavailable"}
            </p>
            <p className={styles.overview}>
              {movie.overview || "No description available."}
            </p>
            <span className={styles.moreDetails}>More details</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
