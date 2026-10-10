import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import useMovies from "../hooks/useMovies.js";
import useMovieGenres from "../hooks/useMovieGenres.js";
import styles from "./MoviePage.module.css";
import noPoster from "../assets/no_poster.svg";

export default function MoviePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hoveredMovie, setHoveredMovie] = useState(null);

  const query = searchParams.get("query") ?? "";
  const selectedGenreId = searchParams.get("genre");

  const {
    genres,
    loading: genresLoading,
    error: genresError,
  } = useMovieGenres();

  const { movies, loading, error } = useMovies(query, selectedGenreId);

  function handleGenreChange(genreId) {
    const nextParams = new URLSearchParams(searchParams);

    if (genreId === null) {
      nextParams.delete("genre");
    } else {
      nextParams.set("genre", String(genreId));
    }

    setSearchParams(nextParams, { replace: true });
  }

  const detailParams = new URLSearchParams();

  if (query) {
    detailParams.set("query", query);
  }

  if (selectedGenreId) {
    detailParams.set("genre", selectedGenreId);
  }

  const detailSearch = detailParams.toString();

  const hoverBackground = hoveredMovie?.poster_path
    ? `url("https://image.tmdb.org/t/p/w1280${hoveredMovie.poster_path}")`
    : hoveredMovie
      ? "linear-gradient(135deg, #39344c, #161820)"
      : "none";

  return (
    <main
      className={`page ${styles.moviePage}`}
      style={{ "--hover-background": hoverBackground }}
      data-hover-active={hoveredMovie !== null}
    >
      <h1>Movies</h1>

      {loading && <p>Loading movies...</p>}
      {error && <p role="alert">{error}</p>}
      {genresLoading && <p>Loading genres...</p>}
      {genresError && <p role="alert">{genresError}</p>}

      <label className={styles.genreSelectLabel} htmlFor="genre-select">
        Choose a category
      </label>

      <select
        className={styles.genreSelect}
        id="genre-select"
        value={selectedGenreId ?? ""}
        onChange={(event) => handleGenreChange(event.target.value || null)}
      >
        <option value="">All</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      <div className={styles.genreFilters}>
        <button
          type="button"
          className={`${styles.genreButton} ${
            selectedGenreId === null ? styles.selected : ""
          }`}
          aria-pressed={selectedGenreId === null}
          onClick={() => handleGenreChange(null)}
        >
          All
        </button>

        {genres.map((genre) => (
          <button
            type="button"
            className={`${styles.genreButton} ${
              selectedGenreId === String(genre.id) ? styles.selected : ""
            }`}
            aria-pressed={selectedGenreId === String(genre.id)}
            key={genre.id}
            onClick={() => handleGenreChange(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {!loading &&
        !error &&
        (query.trim() || selectedGenreId !== null) &&
        movies.length === 0 && <p>No movies found. Try another search.</p>}

      {!error && (
        <div className={styles.searchResults}>
          {movies.map((movie) => (
            <Link
              className={styles.searchResult}
              key={movie.id}
              to={`/movies/${movie.id}${detailSearch ? `?${detailSearch}` : ""}`}
              onMouseEnter={() => setHoveredMovie(movie)}
              onMouseLeave={() => setHoveredMovie(null)}
              onFocus={() => setHoveredMovie(movie)}
              onBlur={() => setHoveredMovie(null)}
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
      )}
    </main>
  );
}
