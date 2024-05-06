import axios from "axios";

const http = axios.create({ baseURL: "http://localhost:3000" });

export function getMovies() {
  return http.get("/movies");
}

export function getMovieDetails(id) {
  return http.get(`/movies/${id}`);
}

export function getCinemas(params) {
  return http.get("/cinemas", { params });
}

export function getCinemasDetail(id) {
  return http.get(`/cinemas/${id}`);
}
