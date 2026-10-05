import { Link, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice.js";
import useMovieDetails from "../hooks/useMovieDetails.js";
import noPoster from "../assets/no_poster.svg";
import styles from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");
  const dispatch = useDispatch();
  const libraryItems = useSelector((state) => state.library.items);
  const libraryItem = libraryItems.find(
    (item) => String(item.movie.id) === movieId,
  );

  const moviesUrl = searchQuery
    ? `/movies?query=${encodeURIComponent(searchQuery)}`
    : "/movies";
  const { movie, loading, error } = useMovieDetails(movieId);

  if (loading) {
    return (
      <main className="page">
        <p>Loading movie details...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <p role="alert">{error}</p>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="page">
        <p>Movie not found.</p>
      </main>
    );
  }

  const videos = movie.videos?.results ?? [];
  const trailer =
    videos.find(
      (video) =>
        video.site === "YouTube" && video.type === "Trailer" && video.official,
    ) ??
    videos.find(
      (video) => video.site === "YouTube" && video.type === "Trailer",
    );

  return (
    <main className={`page ${styles.movieDetailsPage}`}>
      <Link className={styles.backLink} to={moviesUrl}>
        ← Back to movies
      </Link>

      <div className={styles.movieHeader}>
        <h1>{movie.title}</h1>

        <p className={styles.metadata}>
          {movie.release_date?.slice(0, 4) || "Release year unavailable"}
          {movie.runtime ? ` · ${movie.runtime} min` : ""}
        </p>

        {movie.genres?.length > 0 && (
          <p className={styles.metadata}>
            {movie.genres.map((genre) => genre.name).join(" · ")}
          </p>
        )}
      </div>

      <section className={styles.movieDetails}>
        <img
          className={styles.poster}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : noPoster
          }
          alt={`Poster for ${movie.title}`}
        />

        <div className={styles.trailer}>
          {trailer ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${trailer.key}`}
              title={`${movie.title} trailer`}
              allowFullScreen
            />
          ) : (
            <p className={styles.noTrailer}>No trailer available.</p>
          )}
        </div>
      </section>

      <p className={styles.overview}>
        {movie.overview || "No description available."}
      </p>

      {libraryItem ? (
        <p className={styles.libraryStatus} aria-live="polite">
          {libraryItem.type === "buy" ? "Purchased" : "Rented"} — available in
          My Library
        </p>
      ) : (
        <div className={styles.cartActions}>
          <button
            type="button"
            onClick={() => dispatch(addToCart({ movie, type: "buy" }))}
          >
            Buy Movie
          </button>

          <button
            type="button"
            onClick={() => dispatch(addToCart({ movie, type: "rent" }))}
          >
            Rent Movie
          </button>
        </div>
      )}
    </main>
  );
}
