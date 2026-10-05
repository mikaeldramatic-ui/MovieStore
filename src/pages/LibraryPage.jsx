import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import noPoster from "../assets/no_poster.svg";
import styles from "./LibraryPage.module.css";

export default function LibraryPage() {
  const items = useSelector((state) => state.library.items);
  const purchasedItems = items.filter((item) => item.type === "buy");
  const rentalItems = items.filter((item) => item.type === "rent");

  const renderMovieCards = (libraryItems) =>
    libraryItems.map((item) => (
      <Link
        className={styles.libraryItem}
        key={item.movie.id}
        to={`/movies/${item.movie.id}`}
      >
        <img
          className={styles.poster}
          src={
            item.movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.movie.poster_path}`
              : noPoster
          }
          alt={`Poster for {item.movie.title}`}
        />
        <h3>{item.movie.title}</h3>
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
