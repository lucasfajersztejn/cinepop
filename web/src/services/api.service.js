import axios from "axios";

const http = axios.create({ baseURL: "http://localhost:3000" });

http.interceptors.request.use(function (config) {
  config.headers.authorization = `BEARER ${localStorage.getItem("token")}`;
  return config;
});


// User
export function login() {
  return http.post("/login", data).then((response) => {
    localStorage.setItem("token", response.data.accessToken)

    return response;
  })
}

export function logout() {
  localStorage.removeItem("token");
}

// Movies
export function getMovies() {
  return http.get("/movies");
}

export function getMovieDetails(id) {
  return http.get(`/movies/${id}`);
}


// Cinemas
export function getCinemas() {
  return http.get("/cinemas");
}

export function getCinemasDetails(id) {
  return http.get(`/cinemas/${id}`);
}
