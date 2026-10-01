import { Link } from "react-router-dom";

const featuredMovie = {
  id: 1,
  title: "Dune: Part Two",
  description:
    "Join Paul Atreides on an epic journey across the desert planet Arrakis.",
};

const recommendedMovies = [
  { id: 2, title: "Oppenheimer", genre: "Drama", year: 2023 },
  { id: 3, title: "The Batman", genre: "Action", year: 2022 },
  {
    id: 4,
    title: "Everything Everywhere All at Once",
    genre: "Sci-Fi",
    year: 2022,
  },
  { id: 5, title: "Nope", genre: "Thriller", year: 2022 },
];

export default function HomePage() {
  return (
    <main className="home-page">
      <section className="hero-banner">
        <div className="hero-content">
          <p className="eyebrow">Featured movie</p>
          <h1>{featuredMovie.title}</h1>
          <p>{featuredMovie.description}</p>

          <Link className="primary-button" to={`/movies/${featuredMovie.id}`}>
            View details
          </Link>
        </div>
      </section>

      <section className="movie-section">
        <h2>Recommended for you</h2>

        <div className="movie-row">
          {recommendedMovies.map((movie) => (
            <Link
              className="movie-card"
              key={movie.id}
              to={`/movies/${movie.id}`}
            >
              <div className="movie-poster">
                <span>{movie.title}</span>
              </div>
              <h3>{movie.title}</h3>
              <p>
                {movie.genre} • {movie.year}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
