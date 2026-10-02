import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const cartCount = useSelector((state) => state.cart.items.length);

  return (
    <main className={`page/ ${styles.page}`}>
      <h1>My Profile</h1>

      <section className={styles.profileCard}>
        <h2>Welcome Movie Fan</h2>
        <p>Your account overview</p>
      </section>

      <nav className={styles.profileNav} aria-label="Profile navigation">
        <Link className={styles.profileLink} to="/library">
          My Library
        </Link>
        <Link className={styles.profileLink} to="/cart">
          My Cart ({cartCount})
        </Link>
      </nav>
    </main>
  );
}
