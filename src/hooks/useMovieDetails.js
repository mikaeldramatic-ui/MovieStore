import { useEffect,useState } from "react";
import { getMovieDetails } from "../services/tmdb.js";

export default function useMovieDetails(movieId) {

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let ignore = false;

        async function loadMovie() {
            setLoading(true);
            setError("");

            try {
                const result= await getMovieDetails(movieId);

                if (!ignore) {
                    setMovie(result);
                }
            } catch {
                if (!ignore) {
                    setError("Could not load movie details. Please try again later.");
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
            }

            loadMovie();

            return() => {
                ignore= true;
            };
        }, 
        [movieId]);

        return {movie, loading, error };

}