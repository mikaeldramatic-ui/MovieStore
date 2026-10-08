import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useMovies from "../hooks/useMovies.js";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const { movies, loading, error } = useMovies("", null);
  const featuredMovies = movies.slice(0, 5);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    if (featuredMovies.length < 2) {
      return;
    }

    const timerId = setInterval(() => {
      setFeaturedIndex((current) => (current + 1) % featuredMovies.length);
    }, 7000);

    return () => clearInterval(timerId);
  }, [featuredMovies.length]);

  const featuredMovie = featuredMovies[featuredIndex];
  const recommendedMovies = movies.slice(5, 11);

  function showPreviousMovie() {
    setFeaturedIndex(
      (current) =>
        (current - 1 + featuredMovies.length) % featuredMovies.length,
    );
  }

  function showNextMovie() {
    setFeaturedIndex((current) => (current + 1) % featuredMovies.length);
  }

  return (
    <main className={styles.homePage}>
      {loading && <p className="page">Loading movies...</p>}

      {error && (
        <p className="page" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && featuredMovie && (
        <section
          className={styles.heroBanner}
          style={{
            backgroundImage: featuredMovie.backdrop_path
              ? `linear-gradient(90deg, rgb(8 9 12 / 82%) 0%, rgb(8 9 13 / 55%) 50%, rgb(8 9 13 / 15%) 100%), url("https://image.tmdb.org/t/p/w1280${featuredMovie.backdrop_path}")`
              : featuredMovie.poster_path
                ? `linear-gradient(90deg, rgb(8 9 12 / 82%) 0%, rgb(8 9 13 / 55%) 50%, rgb(8 9 13 / 15%) 100%), url("https://image.tmdb.org/t/p/w500${featuredMovie.poster_path}")`
                : "radial-gradient(ellipse at 75% 30%, #68523c, #25232d 45%, #101116 80%)",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Featured movie</p>
            <h1>{featuredMovie.title}</h1>
            <p>
              {featuredMovie.overview || "Discover this movie on MovieStore."}
            </p>

            <Link
              className={styles.primaryButton}
              to={`/movies/${featuredMovie.id}`}
            >
              View details
            </Link>
          </div>

          <button
            className={`${styles.heroArrow} ${styles.heroArrowPrevious}`}
            type="button"
            onClick={showPreviousMovie}
            aria-label="Previous featured movie"
          >
            ‹
          </button>

          <div
            className={styles.heroDots}
            role="group"
            aria-label="Choose featured movie"
          >
            {featuredMovies.map((movie, index) => (
              <button
                className={styles.heroDot}
                key={movie.id}
                type="button"
                aria-label={`Show ${movie.title}`}
                aria-pressed={featuredIndex === index}
                onClick={() => setFeaturedIndex(index)}
              />
            ))}
          </div>

          <button
            className={`${styles.heroArrow} ${styles.heroArrowNext}`}
            type="button"
            onClick={showNextMovie}
            aria-label="Next featured movie"
          >
            ›
          </button>
        </section>
      )}

      {!loading && !error && recommendedMovies.length > 0 && (
        <section className={styles.movieSection}>
          <h2>Recommended for you</h2>

          <div className={styles.movieRow}>
            {recommendedMovies.map((movie) => (
              <Link
                className={styles.movieCard}
                key={movie.id}
                to={`/movies/${movie.id}`}
              >
                <div
                  className={styles.moviePoster}
                  style={{
                    backgroundImage: movie.poster_path
                      ? `linear-gradient(0deg, rgb(8 9 13 / 85%), transparent 60%), url("https://image.tmdb.org/t/p/w500${movie.poster_path}")`
                      : undefined,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <span>{movie.title}</span>
                  <span className={styles.moreDetails}>More details</span>
                </div>

                <p>{movie.release_date?.slice(0, 4) || "Year unavailable"}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
