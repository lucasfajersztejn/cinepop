import axios from "axios";

const http = axios.create({ baseURL: "http://localhost:3000" });

export function getMovies() {
  return http.get("/movies");
}

export function getMovieDetails(id) {
  return http.get(`/movies/${id}`);
}

export function getCinemas() {
  return http.get("/cinemas");
}

export function getCinemasDetails(id) {
  return http.get(`/cinemas/${id}`);
}
