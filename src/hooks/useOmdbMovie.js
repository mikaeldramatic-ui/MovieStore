import { useEffect, useState } from "react";
import { getOmdbMovie } from "../services/omdb.js";

export default function useOmdbMovie(imdbId) {
  const [omdbMovie, setOmdbMovie] = useState(null);
  const [loading, setLoading] = useState(Boolean(imdbId));
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    if (!imdbId) {
      setOmdbMovie(null);
      setLoading(false);
      setError("");
      return () => {
        ignore = true;
      };
    }

    async function loadOmdbMovie() {
      setLoading(true);
      setError("");

      try {
        const result = await getOmdbMovie(imdbId);

        if (!ignore) {
          setOmdbMovie(result);
        }
      } catch {
        if (!ignore) {
          setError("OMDb ratings are currently unavailable.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadOmdbMovie();

    return () => {
      ignore = true;
    };
  }, [imdbId]);

  return { omdbMovie, loading, error };
}