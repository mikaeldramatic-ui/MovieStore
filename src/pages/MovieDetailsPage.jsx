import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice.js";
import useOmdbMovie from "../hooks/useOmdbMovie.js";
import useMovieDetails from "../hooks/useMovieDetails.js";
import noPoster from "../assets/no_poster.svg";
import styles from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const location = useLocation();
  const returnPath = location.state?.from;
  const { movieId } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");
  const searchGenreId = searchParams.get("genre");
  const dispatch = useDispatch();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 1_000);

    return () => window.clearInterval(intervalId);
  }, []);

  const libraryItems = useSelector((state) => state.library.items);

  const libraryItem = libraryItems.find(
    (item) =>
      String(item.movie.id) === movieId &&
      (item.type === "buy" ||
        !item.rentalExpiresAt ||
        item.rentalExpiresAt > now),
  );
  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => String(item.movie.id) === movieId),
  );
  const moviesParams = new URLSearchParams();

  if (searchQuery) {
    moviesParams.set("query", searchQuery);
  }

  if (searchGenreId) {
    moviesParams.set("genre", searchGenreId);
  }

  const moviesUrl = `/movies${
    moviesParams.toString() ? `?${moviesParams.toString()}` : ""
  }`;

  const returnLabels = {
    "/": "← Back to home",
    "/library": "← Back to My Library",
    "/cart": "← Back to cart",
  };

  const backUrl = returnLabels[returnPath] ? returnPath : moviesUrl;
  const backLabel = returnLabels[returnPath] ?? "← Back to movies";

  const { movie, loading, error } = useMovieDetails(movieId);
  const {
    omdbMovie,
    loading: omdbLoading,
    error: omdbError,
  } = useOmdbMovie(movie?.external_ids?.imdb_id);

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

  const ratings = omdbMovie?.Ratings ?? [];

  const videos = movie.videos?.results ?? [];
  const trailer =
    videos.find(
      (video) =>
        video.site === "YouTube" && video.type === "Trailer" && video.official,
    ) ??
    videos.find(
      (video) => video.site === "YouTube" && video.type === "Trailer",
    );

  const topCast = movie.credits?.cast?.slice(0, 4) ?? [];

  return (
    <main
      className={`page ${styles.movieDetailsPage}`}
      style={{
        "--detail-background": movie.poster_path
          ? `url("https://image.tmdb.org/t/p/w1280${movie.poster_path}")`
          : "linear-gradient(135deg, #39344c, #161820)",
      }}
    >
      <Link className={styles.backLink} to={backUrl}>
        {backLabel}
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

        <aside className={styles.castCard} aria-labelledby="top-cast-title">
          <h2 id="top-cast-title">Top Cast</h2>

          {topCast.length > 0 ? (
            <ul className={styles.castList}>
              {topCast.map((actor) => (
                <li
                  className={styles.castItem}
                  key={actor.cast_id ?? actor.credit_id ?? actor.id}
                >
                  {actor.profile_path ? (
                    <img
                      className={styles.castPhoto}
                      src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                      alt=""
                      loading="lazy"
                    />
                  ) : (
                    <div className={styles.castPlaceholder} aria-hidden="true">
                      {actor.name?.charAt(0) ?? "?"}
                    </div>
                  )}

                  <div className={styles.castInfo}>
                    <span>{actor.name}</span>
                    {actor.character && <small>{actor.character}</small>}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Cast information unavailable.</p>
          )}
        </aside>
      </section>

      <section className={styles.overviewCard}>
        <p className={styles.overview}>
          {movie.overview || "No description available."}
        </p>
      </section>

      <section className={styles.ratingsCard} aria-labelledby="ratings-title">
        <div className={styles.ratingsHeader}>
          <h2 id="ratings-title">Ratings &amp; info</h2>
          <span className={styles.omdbBadge}>OMDb</span>
        </div>

        {omdbLoading ? (
          <p>Loading ratings...</p>
        ) : omdbError ? (
          <p role="status">{omdbError}</p>
        ) : ratings.length > 0 ? (
          <ul className={styles.ratingsList}>
            {ratings.map((rating) => (
              <li key={rating.Source}>
                <span>{rating.Source}</span>
                <strong>{rating.Value}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <p>No external ratings available.</p>
        )}
      </section>

      {libraryItem ? (
        <p className={styles.libraryStatus} aria-live="polite">
          {libraryItem.type === "buy" ? "Purchased" : "Rented"} — available in
          My Library
        </p>
      ) : (
        <div>
          {cartItem && (
            <p className={styles.cartStatus} role="status">
              Added to cart: {cartItem.type === "buy" ? "purchase" : "rental"}.
            </p>
          )}

          <div className={styles.cartActions}>
            <button
              className={
                cartItem?.type === "buy" ? styles.selectedCartAction : ""
              }
              type="button"
              aria-pressed={cartItem?.type === "buy"}
              onClick={() => dispatch(addToCart({ movie, type: "buy" }))}
            >
              Buy Movie
            </button>

            <button
              className={
                cartItem?.type === "rent" ? styles.selectedCartAction : ""
              }
              type="button"
              aria-pressed={cartItem?.type === "rent"}
              onClick={() => dispatch(addToCart({ movie, type: "rent" }))}
            >
              Rent Movie
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
