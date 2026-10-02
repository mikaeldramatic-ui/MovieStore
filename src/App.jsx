import { NavLink, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./pages/HomePage.jsx";
import MoviePage from "./pages/MoviePage.jsx";
import MovieDetailsPage from "./pages/MovieDetailsPage.jsx";
import "./App.css";

function Page({ title }) {
  return (
    <main className="page">
      <h1>{title}</h1>
    </main>
  );
}

export default function App() {
  const cartCount = useSelector((state) => state.cart.items.length);

  return (
    <div className="app">
      <header className="app-header">
        <NavLink to="/" end className="logo">
          MovieStore
        </NavLink>

        <nav className="app-nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/movies">Movies</NavLink>
          <NavLink to="/library">Library</NavLink>
          <NavLink to="/cart">Cart {cartCount}</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
        <Route path="/library" element={<Page title="Library" />} />
        <Route path="/cart" element={<Page title="Cart" />} />
        <Route path="/profile" element={<Page title="My profile" />} />
        <Route path="*" element={<Page title="Page not found" />} />
      </Routes>
    </div>
  );
}
