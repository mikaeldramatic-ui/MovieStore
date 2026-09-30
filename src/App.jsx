import { NavLink, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function Page({ title }) {
  return (
    <main className="page">
      <h1>{title}</h1>
    </main>
  );
}

export default function App() {
  const cartCount = useSelector((state) => state.cart.items.lenght);

  return (
    <div className="app">
      <header className="app-header">
        <NavLink to="/" className="logo">
          MovieStore
        </NavLink>

        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/movies">Movies</NavLink>
          <NavLink to="/library">Library</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Page title="Welcome to MovieStore" />} />
        <Route path="/movies" element={<Page title="Movies" />} />
        <Route path="/library" element={<Page title="Library" />} />
        <Route path="/cart" element={<Page title="Cart" />} />
        <Route path="/profile" element={<Page title="My profile" />} />
        <Route path="/*" element={<Page title="Page Cannot find" />} />
      </Routes>
    </div>
  );
}
