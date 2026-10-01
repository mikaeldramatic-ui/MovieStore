const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function searchMovies(query) {
    const params = new URLSearchParams({
        query,
        includes_adult: "false",
        language: "en-US",
        api_key: API_KEY,

    });

    const response = await fetch(
        `${BASE_URL}/search/movie?${params}`
    );

    if (!response.ok) {
        throw new Error("Could not load movies from TMDb.");
    }
    const data = await response.json();
    return data.results;
}