const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchFromTmdb(endpoint, params, errorMessage) {
  const searchParams = new URLSearchParams({
    ...params,
    api_key: API_KEY,
  });

  const response = await fetch(
    `${BASE_URL}${endpoint}?${searchParams}`,
  );

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response.json();
}

export async function searchMovies(query) {
  const data = await fetchFromTmdb(
    "/search/movie",
    {
      query,
      include_adult: "false",
      language: "en-US",
    },
    "Could not load movies from TMDb.",
  );

  return data.results;
}

export async function getMovieDetails(movieId) {
  return fetchFromTmdb(
    `/movie/${movieId}`,
    {
      language: "en-US",
      append_to_response: "videos,credits,external_ids",
    },
    "Could not load movie details from TMDb.",
  );
}

export async function getMovieGenres() {
  const data = await fetchFromTmdb(
    "/genre/movie/list",
    { language: "en-US" },
    "Could not load movie genres from TMDb.",
  );

  return data.genres;
}

export async function discoverMoviesByGenre(genreId = null) {
  const params = {
    include_adult: "false",
    include_video: "false",
    language: "en-US",
    sort_by: "popularity.desc",
  };

  if (genreId !== null) {
    params.with_genres = String(genreId);
  }

  const data = await fetchFromTmdb(
    "/discover/movie",
    params,
    "Could not load movies for this genre from TMDb.",
  );

  return data.results;
}