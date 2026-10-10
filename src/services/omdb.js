const OMDB_BASE_URL = "https://www.omdbapi.com";

export async function getOmdbMovie(imdbId) {
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;

    if (!apiKey) {
        throw new Error("OMDb API key is missing.");
    }

    const params = new URLSearchParams({
        i: imdbId,
        apikey: apiKey,
    });

    const response = await fetch(`${OMDB_BASE_URL}?${params}`);

    if (!response.ok) {
        throw new Error("Could not fetch movie information from OMDb.");
    }

    const data = await response.json();

    if (data.Response === "False") {
        throw new Error(data.Error || "OMDb could not find this movie.");
    }

    return data;
}