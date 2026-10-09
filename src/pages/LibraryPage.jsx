import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import noPoster from "../assets/no_poster.svg";
import styles from "./LibraryPage.module.css";

function getRentalTimeLabel(rentalExpiresAt, now) {
  if (!rentalExpiresAt) {
    return "Rental period unavailable";
  }

  const millisecondsLeft = rentalExpiresAt - now;

  if (millisecondsLeft <= 0) {
    return "Rental expired";
  }

  const totalSeconds = Math.ceil(millisecondsLeft / 1_000);
  const hours = Math.floor(totalSeconds / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;

  return `Rental · ${hours}h ${minutes}m ${seconds}s left`;
}

export default function LibraryPage() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 1_000);

    return () => window.clearInterval(intervalId);
  }, []);

  const items = useSelector((state) => state.library.items);
  const purchasedItems = items.filter((item) => item.type === "buy");
  const rentalItems = items.filter((item) => item.type === "rent");

  const renderMovieCards = (libraryItems) =>
    libraryItems.map((item) => (
      <Link
        className={styles.libraryItem}
        key={item.movie.id}
        to={`/movies/${item.movie.id}`}
        state={{ from: "/library" }}
      >
        <img
          className={styles.poster}
          src={
            item.movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.movie.poster_path}`
              : noPoster
          }
          alt={`Poster for ${item.movie.title}`}
        />

        <h3>{item.movie.title}</h3>

        {item.type === "rent" && (
          <p className={styles.rentalStatus}>
            {getRentalTimeLabel(item.rentalExpiresAt, now)}
          </p>
        )}
      </Link>
    ));

  return (
    <main className={`page ${styles.libraryPage}`}>
      <h1>My Library</h1>

      {items.length === 0 ? (
        <section className={styles.emptyLibrary}>
          <p>Your library is empty.</p>
          <Link to="/movies">Browse movies</Link>
        </section>
      ) : (
        <>
          <section className={styles.librarySection}>
            <h2>Purchased</h2>

            {purchasedItems.length > 0 ? (
              <div className={styles.libraryRow}>
                {renderMovieCards(purchasedItems)}
              </div>
            ) : (
              <p className={styles.emptySection}>No purchased movies yet.</p>
            )}
          </section>

          <section className={styles.librarySection}>
            <h2>Rental</h2>

            {rentalItems.length > 0 ? (
              <div className={styles.libraryRow}>
                {renderMovieCards(rentalItems)}
              </div>
            ) : (
              <p className={styles.emptySection}>No rental movies yet.</p>
            )}
          </section>
        </>
      )}
    </main>
  );
}
