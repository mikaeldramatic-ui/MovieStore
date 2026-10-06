import { useEffect, useState } from "react";
import { getMovieGenres } from "../services/tmdb.js";

export default function useMovieGenres() {

    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const[error, setError]= useState("");

    useEffect(() => {
        let ignore = false;

        async function loadGenres() {
            try {
                const results = await getMovieGenres();

                if (!ignore) {
                    setGenres(results);
                }
            } catch {
                if(!ignore) {
                    setError("Could not load movie genres. Please try again.");
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        }

        loadGenres();

        return () => {
            ignore = true;
        };
    }, []);

    return {genres, loading, error};

} 