require("dotenv").config();
require("../configs/db.config");
const axios = require("axios");
const Movie = require("../models/movie.model");
const Cinema = require("../models/cinema.model");

const movies = require("../data/movies.json");
const genreId = require("../data/genreId.json");
const cinemas = require("../data/cinemas.json");

// Movie.create(moviesWithGenreNames)
//   .then((movie) => console.debug(`${movie.length} movies created.`))
//   .catch((error) => console.error(error))

// Cinema.create(cinemas)
//   .then((cinema) => console.debug(`${cinema.length} movies created.`))
//   .catch((error) => console.error(error))

// function replaceGenreIds(movie) {
//   const genreNames = movie.genre_ids.map((id) => genreId[id]);
//   return { ...movie, genre_ids: genreNames };
// }

// const moviesWithGenreNames = movies.map((movie) => replaceGenreIds(movie));

async function fetchMoviesAndTrailers() {
  const url =
    "https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=3";
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };

  try {
    const response = await axios.get(url, options);
    const data = response.data;
    const moviesJson = data.results;

    const moviesWithTrailers = [];

    for (const movie of moviesJson) {
      const videoUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos`;
      const castUrl = `https://api.themoviedb.org/3/movie/${movie.id}/credits`;
      const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movie.id}`;
      const certification = `https://api.themoviedb.org/3/movie/${movie.id}/release_dates`;

      const [
        videoResponse,
        castResponse,
        movieDetailResponse,
        certificationsResponse,
      ] = await Promise.all([
        axios.get(videoUrl, options),
        axios.get(castUrl, options),
        axios.get(movieDetailUrl, options),
        axios.get(certification, options),
      ]);

      const videoData = videoResponse.data;
      const castData = castResponse.data;
      const movieDetailData = movieDetailResponse.data;
      const movieCertifications = certificationsResponse.data;

      const trailers = videoData.results.filter(
        (video) => video.type === "Trailer"
      );

      const genreNames = movie.genre_ids.map((id) => genreId[id]);

      const simplifiedCastData = castData.cast.map((cast) => ({
        name: cast.name,
        original_name: cast.original_name,
        character: cast.character,
        profile_path: cast.profile_path,
      }));

      const directorFilter = castData.crew.find(
        (cast) => cast.job === "Director"
      );

      const directorInfo = directorFilter
        ? {
            name: directorFilter.name,
            original_name: directorFilter.original_name,
            profile_path: directorFilter.profile_path,
            job: directorFilter.job,
          }
        : null;

      const movieCertificationResult = movieCertifications.results.filter(
        (certification) => certification.iso_3166_1 === "ES"
      );
      //console.log(movieCertificationResult[0].release_dates[0].certification);
      let movieCertified;
      if (movieCertificationResult.length > 0) {
        
          if (movieCertificationResult[0].release_dates[0].certification !== "") {
            movieCertified = movieCertificationResult[0].release_dates[0].certification
          } else {
            movieCertified = "";
          }
      } else {
        movieCertified = "";
      }

      if (movie.overview === "") {
        movie.overview = "-";
      }

      if (trailers.length > 0) {
        const movieWithTrailer = {
          adult: movie.adult,
          backdrop_path: movie.backdrop_path,
          genre_ids: genreNames,
          idMovie: movie.id,
          original_language: movie.original_language,
          original_title: movie.original_title,
          overview: movie.overview,
          popularity: movie.popularity,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          title: movie.title,
          video: movie.video,
          vote_average: movie.vote_average,
          vote_count: movie.vote_count,
          youtube_key: trailers[0].key,
          cast: simplifiedCastData,
          director: directorInfo,
          runTime: movieDetailData.runtime,
          certification: movieCertified,
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

fetchMoviesAndTrailers()
  .then((moviesWithTrailers) => {
    return Movie.create(moviesWithTrailers);
  })
  .then((movies) => {
    console.debug(`${movies.length} movies created.`);
  })
  .catch((error) => {
    console.error(
      "Error fetching movies and trailers or charging the database:",
      error
    );
  });
