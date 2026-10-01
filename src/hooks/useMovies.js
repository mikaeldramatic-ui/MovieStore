import { useEffect, useState } from "react";
import { searchMovies } from "../services/tmdb.js";

export default function useMovies(query) {
const [movies,setMovies] = useState([]);
const [loading, setLoading]=useState(false);
const [error, setError]=useState("");

useEffect(() => {
    let ignore = false;

    if (!query.trim()) {
        setMovies([]);
        setLoading(false);
        setError("");
        return;
    }

    const timeoutId = setTimeout(async () => {
        setLoading(true);
        setError("");

        try {
            const results = await searchMovies(query);

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
    }, 400);
    return () => {
        ignore = true;
        clearTimeout(timeoutId);
    };
}, [query]);

return { movies, loading, error };


}