import { useEffect, useState } from "react";
import { getMovies } from "../../../services/api.service";
import MovieItem from "../movie-item/movie-item";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const { data: movies } = await getMovies();
        setMovies(movies)
      } catch(error) {
        console.error(error);
      }
    }

    fetchMovies();
  }, []);


  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-10">
        {movies.map((movie) => (
          <div key={movie.idMovie} className=" rounded-lg"><MovieItem movie={movie}/></div>
        ))}
      </div>
    </div>
  )
}

export default MovieList;