import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { clearCart, removeFromCart } from "../features/cart/cartSlice.js";
import { addItemsToLibrary } from "../features/library/librarySlice.js";
import noPoster from "../assets/no_poster.svg";
import styles from "./CartPage.module.css";

export default function CartPage() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const RENTAL_PERIOD_MS = 48 * 60 * 60 * 1000;

  function handleConfirmCheckout() {
    const checkoutTime = Date.now();

    const libraryItems = items.map((item) =>
      item.type === "rent"
        ? { ...item, rentalExpiresAt: checkoutTime + RENTAL_PERIOD_MS }
        : item,
    );
    dispatch(addItemsToLibrary(libraryItems));
    dispatch(clearCart());
    setShowConfirmation(false);
    setOrderComplete(true);
  }

  return (
    <main className={`page ${styles.cartPage}`}>
      <h1>My Cart</h1>

      {orderComplete ? (
        <section className={styles.orderComplete}>
          <h2>Order confirmed</h2>
          <p>Your movies have been added to your library.</p>
          <Link to="/library">Go to My Library</Link>
        </section>
      ) : items.length === 0 ? (
        <section className={styles.emptyCart}>
          <p>Your cart is empty.</p>
          <Link to="/movies">Browse movies</Link>
        </section>
      ) : showConfirmation ? (
        <section className={styles.checkoutConfirmation}>
          <h2>Confirm your order</h2>

          <ul>
            {items.map((item) => (
              <li key={item.movie.id}>
                {item.movie.title} —{" "}
                {item.type === "buy" ? "Purchase" : "Rental"}
              </li>
            ))}
          </ul>

          <p>This is a demo checkout. No payment will be made.</p>

          <button type="button" onClick={handleConfirmCheckout}>
            Confirm order
          </button>

          <button type="button" onClick={() => setShowConfirmation(false)}>
            Back to cart
          </button>
        </section>
      ) : (
        <>
          <section className={styles.cartItems}>
            {items.map((item) => (
              <article className={styles.cartItem} key={item.movie.id}>
                <Link
                  className={styles.cartPosterLink}
                  to={`/movies/${item.movie.id}`}
                  state={{ from: "/cart" }}
                >
                  <img
                    className={styles.cartPoster}
                    src={
                      item.movie.poster_path
                        ? `https://image.tmdb.org/t/p/w154${item.movie.poster_path}`
                        : noPoster
                    }
                    alt={`Poster for ${item.movie.title}`}
                    loading="lazy"
                  />
                </Link>

                <div>
                  <h2>
                    <Link
                      className={styles.movieTitleLink}
                      to={`/movies/${item.movie.id}`}
                      state={{ from: "/cart" }}
                    >
                      {item.movie.title}
                    </Link>
                  </h2>
                  <p>{item.type === "buy" ? "Purchase" : "Rental"}</p>
                </div>

                <button
                  type="button"
                  onClick={() => dispatch(removeFromCart(item.movie.id))}
                >
                  Remove
                </button>
              </article>
            ))}
          </section>

          <button
            className={styles.checkoutButton}
            type="button"
            onClick={() => setShowConfirmation(true)}
          >
            Continue to checkout
          </button>
        </>
      )}
    </main>
  );
}
