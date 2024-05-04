require("dotenv").config();
require("../configs/db.config");
const axios = require("axios");
const Movie = require("../models/movie.model");
const Cinema = require("../models/cinema.model")

const movies = require("../data/movies.json");
const genreId = require("../data/genreId.json");
const cinemas = require("../data/cinemas.json")

function replaceGenreIds(movie) {
  const genreNames = movie.genre_ids.map(id => genreId[id]);
  return { ...movie, genre_ids: genreNames };
}
const moviesWithGenreNames = movies.map(movie => replaceGenreIds(movie));

// Movie.create(moviesWithGenreNames)
//   .then((movie) => console.debug(`${movie.length} movies created.`))
//   .catch((error) => console.error(error))

// Cinema.create(cinemas)
//   .then((cinema) => console.debug(`${cinema.length} movies created.`))
//   .catch((error) => console.error(error))
/*
async function fetchMoviesAndTrailers() {
  // Llamada para obtener las películas en cartelera
  const url = "https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=3";
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };

  try {
    const response = await axios.get(url, options);
    const data = response.data;

    const movies = data.results;

    // Array para almacenar las películas con la clave youtube_key
    const moviesWithTrailers = [];

    // Recorrer cada película para obtener sus trailers
    for (const movie of movies) {
      // Llamada para obtener los videos de la película
      const videoUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos`;
      const videoResponse = await axios.get(videoUrl, options);
      const videoData = videoResponse.data;

      // Filtrar los videos para obtener solo los trailers
      const trailers = videoData.results.filter(
        (video) => video.type === "Trailer"
      );

      // Si hay al menos un trailer, añadir la película al array
      if (trailers.length > 0) {
        // Añadir la clave youtube_key a la película
        const movieWithTrailer = {
          ...movie,
          youtube_key: trailers[0].key, // Suponiendo que tomamos el primer trailer
        };

        moviesWithTrailers.push(movieWithTrailer);
      }
    }

    return moviesWithTrailers;
  } catch (error) {
    console.error("Error al obtener películas y trailers:", error);
    return [];
  }
}

// Llamar a la función y obtener las películas con trailers
fetchMoviesAndTrailers()
  .then((movies) => {
    console.log("Películas con trailers:", movies);
  })
  .catch((error) => {
    console.error("Error al obtener películas con trailers:", error);
  });

*/