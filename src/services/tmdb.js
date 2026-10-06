const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function searchMovies(query) {
    const params = new URLSearchParams({
        query,
        include_adult: "false",
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

export async function getMovieDetails(movieId) {
    const params = new URLSearchParams({
        language: "en-US",
        api_key: API_KEY,
        append_to_response: "videos",
    });

    const response = await fetch (
        `${BASE_URL}/movie/${movieId}?${params}`
    );

    if (!response.ok) {
        throw new Error("Could not load movie details from TMDb.");
    }

    return response.json();
}

export async function getMovieGenres() {
    const params = new URLSearchParams({
        language: "en-US",
        api_key: API_KEY,
    });

    const response = await fetch (
        `${BASE_URL}/genre/movie/list?${params}`,
    );

    if (!response.ok) {
        throw new Error("Could not load movie genres from TMDb");
    }

    const data = await response.json();
    return data.genres;
}

export async function discoverMoviesByGenre(genreId = null) {
    const params = new URLSearchParams({
        include_adult: "false",
        include_video: "false",
        language: "en-US",
        sort_by: "popularity.desc",
        api_key: API_KEY,
    });

    if (genreId !== null) {
        params.set("with_genres", String(genreId));
    }

    const response = await fetch (
        `${BASE_URL}/discover/movie?${params}`,
    );

    if (!response.ok) {
        throw new Error("Could not load movies for this genre from TMDb.");
    }

    const data = await response.json();
    return data.results;
}