import { useDispatch } from "react-redux";
import { clearLibrary } from "../features/library/librarySlice.js";
import styles from "./ProfilePage.module.css";

const profileOptions = [
  "App settings",
  "Account",
  "Legal information",
  "Help",
  "Log out",
];

export default function ProfilePage() {
  const dispatch = useDispatch();

  function handleOptionClick(option) {
    window.alert(`${option} - it's just a school project.`);
  }

  function handleClearLibrary() {
    const confirmed = window.confirm("Clear all movies from your library?");

    if (confirmed) {
      dispatch(clearLibrary());
    }
  }

  return (
    <main className={`page ${styles.page}`}>
      <h1>My Profile</h1>

      <section className={styles.profileCard} aria-label="Profile overview">
        <div className={styles.avatar} aria-hidden="true">
          MF
        </div>

        <div>
          <h2>Welcome, Movie Fan</h2>
          <p>Your MovieStore account</p>
        </div>
      </section>

      <nav className={styles.profileNav} aria-label="Profile navigation">
        {profileOptions.map((option) => (
          <button
            className={styles.profileLink}
            key={option}
            type="button"
            onClick={() => handleOptionClick(option)}
          >
            <span>{option}</span>
            <span aria-hidden="true">›</span>
          </button>
        ))}

        <button
          className={styles.profileLink}
          type="button"
          onClick={handleClearLibrary}
        >
          <span>Clear library</span>
          <span aria-hidden="true">›</span>
        </button>
      </nav>
    </main>
  );
}
