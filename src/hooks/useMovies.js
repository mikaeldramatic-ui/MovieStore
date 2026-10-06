import { useEffect, useState } from "react";
import { discoverMoviesByGenre ,searchMovies } from "../services/tmdb.js";

function shuffleMovies(movies) {
    const shuffled = [...movies];

    for (let index = shuffled.length -1; index >0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[randomIndex]] = [
            shuffled[randomIndex],
            shuffled[index],
        ];
    }
    return shuffled;
}

export default function useMovies(query, genreId = null) {
const [movies,setMovies] = useState([]);
const [loading, setLoading]=useState(false);
const [error, setError]=useState("");

useEffect(() => {
    let ignore = false;
    const trimmedQuery = query.trim();

    const timeoutId = setTimeout(async () => {
        setLoading(true);
        setError("");

                try {
          let results;

          if (trimmedQuery) {
            results = await searchMovies(trimmedQuery);

            if (genreId !== null) {
              results = results.filter((movie) =>
                movie.genre_ids?.includes(Number(genreId)),
              );
            }
                    } else {
            results = await discoverMoviesByGenre(genreId);
          }

          if (!trimmedQuery && genreId === null) {
            results = shuffleMovies(results);
          }

          if (!ignore) {
            setMovies(results);
          }
        } catch {
            if (!ignore) {
                setError("Could not load movies. Please try again.");
            }
        } finally {
            if (!ignore) {
                setLoading(false);
            }
        }
    },
    trimmedQuery ? 400 : 0,
);

return () => {
    ignore = true;
    clearTimeout(timeoutId);
};
}, [query, genreId]);

return { movies, loading, error};
}