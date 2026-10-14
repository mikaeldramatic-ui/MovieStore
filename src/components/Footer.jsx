import { Link } from "react-router-dom";
import tmdbLogo from "../assets/tmdb-logo.svg";
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

      <div className={styles.attribution}>
        <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer">
          <img className={styles.tmdbLogo} src={tmdbLogo} alt="TMDB" />
        </a>
        <p>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB. Ratings provided by OMDb.
        </p>
      </div>

      <p className={styles.copyright}>
        © {new Date().getFullYear()} MovieStore
      </p>
    </footer>
  );
}
