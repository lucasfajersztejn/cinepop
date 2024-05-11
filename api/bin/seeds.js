require("dotenv").config();
require("../configs/db.config");
const axios = require("axios");
const Movie = require("../models/movie.model");
const Cinema = require("../models/cinema.model");
const TimeSheet = require("../models/timesheet.model");

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


// Función para generar horarios aleatorios
function generateRandomSchedules() {
  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const schedules = {};
  daysOfWeek.forEach(day => {
    const numOfSlots = Math.floor(Math.random() * 5) + 1; // Generar entre 1 y 5 horarios por día
    const firstDay = Math.floor(Math.random() * 1) + 1; // Generar entre 1 y 4 horarios por día
    const weekend = Math.floor(Math.random() * 3) + 4; // Devuelve 4 o 5

    if (day === "monday") {
      schedules[day] = Array.from({ length: firstDay }, () => generateRandomTime());
    } else if (day === "saturday") {
      schedules[day] = Array.from({ length: weekend }, () => generateRandomTime());
    } else if (day === "sunday") {
      schedules[day] = Array.from({ length: weekend }, () => generateRandomTime());
    } else {
      schedules[day] = Array.from({ length: numOfSlots }, () => generateRandomTime());
    }

    // Ordenar los horarios de más temprano a más tarde
    schedules[day].sort((a, b) => {
      const [hourA, minuteA] = a.split(":").map(Number);
      const [hourB, minuteB] = b.split(":").map(Number);
      return hourA - hourB || minuteA - minuteB;
    });
  });
  return schedules;
}


// Función para generar una hora aleatoria entre las 09:00 y las 02:00
function generateRandomTime() {
  const startHour = 9; // 09:00
  const endHour = 26; // 02:00 del día siguiente en formato de 24 horas

  // Generar una hora aleatoria entre startHour y endHour
  let randomHour = Math.floor(Math.random() * (endHour - startHour)) + startHour;
  randomHour = randomHour % 24;
  

  // Generar minutos aleatorios entre 0 y 59
  const randomMinutes = Math.floor(Math.random() * 60);

  // Formatear la hora en formato de cadena HH:MM
  return `${randomHour.toString().padStart(2, '0')}:${randomMinutes.toString().padStart(2, '0')}`;
}


async function loadMoviesAndCinemas() {
  try {
    // Obtener todas las películas
    const movies = await Movie.find();
    const moviesIds = movies.map(movie => movie.id);

    // Obtener todos los cines ordenados por prioridad
    const cinemas = await Cinema.find().sort({ priority: 1 });
    const firstCinemas = cinemas.filter((cinema) => cinema.priority === 1).map((cinema) => cinema.id)
    const secondCinemas = cinemas.filter((cinema) => cinema.priority === 2).map((cinema) => cinema.id)
    const thirdCinemas = cinemas.filter((cinema) => cinema.priority === 3).map((cinema) => cinema.id)
    const fourCinemas = cinemas.filter((cinema) => cinema.priority === 4).map((cinema) => cinema.id)

    //obtener desde que fecha hasta que fecha estará en cartelera
    const today = new Date();
    const releaseDate = new Date(today.getTime() - (3 * 7 * 24 * 60 * 60 * 1000)); //today - 3 weeks
    const endDate = new Date(today.getTime() + (3 * 7 * 24 * 60 * 60 * 1000)); //today + 3 weeks
    
    const schedules = generateRandomSchedules();

    // Inicializar un objeto para almacenar el número de películas cargadas por cada cine
    const loadedMoviesCount = {};

    // Recorrer los cines
    for (const cinema of cinemas) {



      // Obtener el número de salas de cine de este cine
      const movieTheaters = cinema.movieTheaters;

      // Calcular cuántas películas cargar para este cine según su prioridad
      const moviesToLoad = Math.floor((movieTheaters * cinema.priority) / 10);

      // Obtener las hojas de tiempo más recientes para este cine
      const timeSheets = await TimeSheet.find({ idCinema: cinema._id })
        .sort({ dateStart: -1 })
        .limit(moviesToLoad);

      // Extraer los IDs de películas de las hojas de tiempo
      const movieIds = timeSheets.map((timeSheet) => timeSheet.idMovie);

      // Filtrar las películas que corresponden a estos IDs
      const loadedMovies = movies.filter((movie) =>
        movieIds.includes(movie._id.toString())
      );

      // Almacenar el número de películas cargadas para este cine
      loadedMoviesCount[cinema._id.toString()] = loadedMovies.length;

      // Hacer algo con las películas cargadas para este cine, por ejemplo, imprimir sus títulos
      // console.log(`Cinema: ${cinema.name}`);
      // loadedMovies.forEach((movie) => {

      // });
    }

    // // Hacer algo con el objeto loadedMoviesCount, por ejemplo, imprimir el número de películas cargadas por cada cine
    // console.log("Movies loaded per cinema:");
    // Object.keys(loadedMoviesCount).forEach((cinemaId) => {
    //   console.log(`${cinemaId}: ${loadedMoviesCount[cinemaId]}`);
    // });
  } catch (error) {
    console.error("Error:", error);
  }
}

// Ejecutar la función
loadMoviesAndCinemas();








// To request the movies from the API, change the genre ids to the genres and load everything in the database 

// async function fetchMoviesAndTrailers() {
//   const url =
//     "https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=3";
//   const options = {
//     headers: {
//       accept: "application/json",
//       Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
//     },
//   };

//   try {
//     const response = await axios.get(url, options);
//     const data = response.data;
//     const moviesJson = data.results;

//     const moviesWithTrailers = [];

//     for (const movie of moviesJson) {
//       const videoUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos`;
//       const castUrl = `https://api.themoviedb.org/3/movie/${movie.id}/credits`;
//       const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movie.id}`;
//       const certification = `https://api.themoviedb.org/3/movie/${movie.id}/release_dates`;

//       const [
//         videoResponse,
//         castResponse,
//         movieDetailResponse,
//         certificationsResponse,
//       ] = await Promise.all([
//         axios.get(videoUrl, options),
//         axios.get(castUrl, options),
//         axios.get(movieDetailUrl, options),
//         axios.get(certification, options),
//       ]);

//       const videoData = videoResponse.data;
//       const castData = castResponse.data;
//       const movieDetailData = movieDetailResponse.data;
//       const movieCertifications = certificationsResponse.data;

//       const trailers = videoData.results.filter(
//         (video) => video.type === "Trailer"
//       );

//       const genreNames = movie.genre_ids.map((id) => genreId[id]);

//       const simplifiedCastData = castData.cast.map((cast) => ({
//         name: cast.name,
//         original_name: cast.original_name,
//         character: cast.character,
//         profile_path: cast.profile_path,
//       }));

//       const directorFilter = castData.crew.find(
//         (cast) => cast.job === "Director"
//       );

//       const directorInfo = directorFilter
//         ? {
//             name: directorFilter.name,
//             original_name: directorFilter.original_name,
//             profile_path: directorFilter.profile_path,
//             job: directorFilter.job,
//           }
//         : null;

//       const movieCertificationResult = movieCertifications.results.filter(
//         (certification) => certification.iso_3166_1 === "ES"
//       );
//       //console.log(movieCertificationResult[0].release_dates[0].certification);
//       let movieCertified;
//       if (movieCertificationResult.length > 0) {
        
//           if (movieCertificationResult[0].release_dates[0].certification !== "") {
//             movieCertified = movieCertificationResult[0].release_dates[0].certification
//           } else {
//             movieCertified = "";
//           }
//       } else {
//         movieCertified = "";
//       }

//       if (movie.overview === "") {
//         movie.overview = "-";
//       }

//       if (trailers.length > 0) {
//         const movieWithTrailer = {
//           adult: movie.adult,
//           backdrop_path: movie.backdrop_path,
//           genre_ids: genreNames,
//           idMovie: movie.id,
//           original_language: movie.original_language,
//           original_title: movie.original_title,
//           overview: movie.overview,
//           popularity: movie.popularity,
//           poster_path: movie.poster_path,
//           release_date: movie.release_date,
//           title: movie.title,
//           video: movie.video,
//           vote_average: movie.vote_average,
//           vote_count: movie.vote_count,
//           youtube_key: trailers[0].key,
//           cast: simplifiedCastData,
//           director: directorInfo,
//           runTime: movieDetailData.runtime,
//           certification: movieCertified,
//         };

//         moviesWithTrailers.push(movieWithTrailer);
//       }
//     }

//     return moviesWithTrailers;
//   } catch (error) {
//     console.error("Error al obtener películas y trailers:", error);
//     return [];
//   }
// }

// fetchMoviesAndTrailers()
//   .then((moviesWithTrailers) => {
//     return Movie.create(moviesWithTrailers);
//   })
//   .then((movies) => {
//     console.debug(`${movies.length} movies created.`);
//   })
//   .catch((error) => {
//     console.error(
//       "Error fetching movies and trailers or charging the database:",
//       error
//     );
//   });
