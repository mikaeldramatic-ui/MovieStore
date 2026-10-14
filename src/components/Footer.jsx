import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const infoLinks = ["Privacy Policy", "Terms of Use", "Cookie Policy", "Help"];

export default function Footer() {
  function handleInfoLinkClick() {
    window.alert("It's just a school project.");
  }

  return (
    <footer className={styles.footer}>
      <Link className={styles.logo} to="/">
        MovieStore
      </Link>

      <nav className={styles.infoLinks} aria-label="Information">
        {infoLinks.map((label) => (
          <button
            className={styles.infoLink}
            key={label}
            type="button"
            onClick={handleInfoLinkClick}
          >
            {label}
          </button>
        ))}
      </nav>

      <p className={styles.copyright}>
        © {new Date().getFullYear()} MovieStore
      </p>
    </footer>
  );
}
