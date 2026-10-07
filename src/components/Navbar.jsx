import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const cartCount = useSelector((state) => state.cart.items.length);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get("query") ?? "";
  const [searchText, setSearchText] = useState(currentQuery);

  useEffect(() => {
    setSearchText(currentQuery);
  }, [currentQuery]);

  function handleSearchChange(event) {
    const value = event.target.value;
    setSearchText(value);

    const nextParams = new URLSearchParams(searchParams);

    if (value.trim()) {
      nextParams.set("query", value);
    } else {
      nextParams.delete("query");
    }

    const search = nextParams.toString();
    navigate(`/movies${search ? `?${search}` : ""}`, { replace: true });
  }

  function handleSearch(event) {
    event.preventDefault();

    const nextParams = new URLSearchParams(searchParams);
    const query = searchText.trim();

    if (query) {
      nextParams.set("query", query);
    } else {
      nextParams.delete("query");
    }

    const search = nextParams.toString();
    navigate(`/movies${search ? `?${search}` : ""}`, { replace: true });
  }

  return (
    <header className={styles.header}>
      <NavLink to="/" end className={styles.logo}>
        MovieStore
      </NavLink>

      <nav className={styles.nav}>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/movies">Movies</NavLink>
        <NavLink to="/library">Library</NavLink>
        <NavLink to="/cart">Cart {cartCount}</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>

      <form className={styles.searchForm} onSubmit={handleSearch}>
        <input
          className={styles.searchInput}
          type="search"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search movies"
          aria-label="Search movies"
        />

        <button
          className={styles.searchButton}
          type="submit"
          aria-label="Submit movie search"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
        </button>
      </form>
    </header>
  );
}
