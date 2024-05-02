const axios = require("axios");



/**
 * Primero
 * 
 * Hacer las peticiones a la API de las peliculas para cargar nuestra BBDD
 * 
 * Segundo
 * 
 * Cuando tengamos las peliculas (que seran un ARRAY), iteramos ("map, forEach") y obtenemos un ARRAY de promesas
 * 
 * Ejemplo
 * 
 * const responses = [{id:2, movie: "Avatar"}].map((movie) => axios.get("[url de la peticion]/${movie.id}"))
 * const promisesResponses = Promise.all(responses)
 * const finalResponses = promieesRespones.map((response) => response.resolve()).map(responses => responses.youtube.key)
 * 
 *
 */