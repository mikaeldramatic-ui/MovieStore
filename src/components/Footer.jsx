import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link className={styles.logo} to="/">
        MovieStore
      </Link>

      <nav className={styles.infoLinks} aria-label="Information">
        {["Privacy Policy", "Terms of Use", "Cookie Policy", "Help"].map(
          (label) => (
            <button
              className={styles.infoLink}
              key={label}
              type="button"
              onClick={() => window.alert("It's just a school project.")}
            >
              {label}
            </button>
          ),
        )}
      </nav>

      <p className={styles.copyright}>
        © {new Date().getFullYear()} MovieStore
      </p>
    </footer>
  );
}
