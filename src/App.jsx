import { NavLink, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./pages/HomePage.jsx";
import MoviePage from "./pages/MoviePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import MovieDetailsPage from "./pages/MovieDetailsPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import LibraryPage from "./pages/LibraryPage.jsx";
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
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Page title="Page not found" />} />
      </Routes>
    </div>
  );
}
