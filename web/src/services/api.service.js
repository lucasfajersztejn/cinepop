import axios from "axios";

const http = axios.create({ baseURL: "http://localhost:3000" });

http.interceptors.request.use(function (config) {
  config.headers.authorization = `BEARER ${localStorage.getItem("token")}`;
  return config;
});

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.response.status === 401 &&
      location.pathname !== "/admin/login"
    ) {
      // navigate refreshing page
      localStorage.removeItem("token");
      window.location.replace("/admin/login");
    }

    return Promise.reject(error);
  }
);

// User
export function login(data) {
  return http.post("/admin/login", data).then((response) => {
    localStorage.setItem("token", response.data.accessToken)

    return response;
  })
}

export function getProfile() {
  return http.get("/admin/profile");
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

export function deleteMovie(id) {
  return http.delete(`/movies/${id}`)
}


// Cinemas
export function getCinemas() {
  return http.get("/cinemas");
}

export function getCinemasDetails(id) {
  return http.get(`/cinemas/${id}`);
}
