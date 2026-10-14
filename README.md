# MovieStore

A React app for exploring movies, renting or buying them digitally, and collecting them in a personal library.

   **Live demo:** https://moviestore-mikaele.netlify.app

## Features

- **Browse and search** – popular movies, search by title and filter by genre
- **Movie details** – poster, trailer, description, top cast and ratings from IMDb, Rotten Tomatoes and Metacritic
- **Buy or rent** – prices are based on the movie's release year
- **Cart** – add, remove and switch between buying and renting, with a counter in the navbar
- **Library** – purchased movies stay forever, rentals expire after 48 hours with a live countdown
- **Saved between visits** – cart and library are stored in the browser with localStorage

## Tech stack

- React and JavaScript (Vite)
- React Router
- Redux Toolkit
- CSS Modules
- [TMDb API](https://www.themoviedb.org/documentation/api) – movies, genres, trailers and cast
- [OMDb API](https://www.omdbapi.com/) – ratings

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a file called `.env.local` in the project root with your own API keys:

   ```
   VITE_TMDB_API_KEY=your_tmdb_key
   VITE_OMDB_API_KEY=your_omdb_key
   ```

   Free keys are available from [TMDb](https://www.themoviedb.org/settings/api) and [OMDb](https://www.omdbapi.com/apikey.aspx).

3. Start the development server:

   ```bash
   npm run dev
   ```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── app/          Redux store and localStorage persistence
├── components/   Navbar and Footer
├── features/     Redux slices for cart and library
├── hooks/        Data fetching hooks (movies, details, genres, ratings)
├── pages/        Home, Movies, Movie details, Cart, Library, Profile
└── services/     TMDb and OMDb API calls, movie pricing
```

## Notes

This is a school project. The API keys are only used in the browser, so they are visible in the built code. Use free personal keys only.
