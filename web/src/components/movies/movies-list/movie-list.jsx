import { useEffect, useState } from "react";
import { getMovies } from "../../../services/api.service";
import MovieItem from "../movie-item/movie-item";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const { data: movies } = await getMovies();
        setMovies(movies)
        setIsLoading(false)
      } catch(error) {
        console.error(error);
      }
    }

    fetchMovies();
  }, []);


  return (
    <div>
    {isLoading ? (
        <div
          className="flex flex-col bg-neutral-300 w-56 h-64 animate-pulse rounded-xl p-4 gap-4 mx-auto mt-10"
        >
          <div className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
          <div className="flex flex-col gap-2">
            <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
            <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
            <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
            <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
          </div>
        </div>

      ) : (
      <div className="grid justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-10 mt-0">
        {movies.map((movie) => (
          <div key={movie.idMovie} className="rounded-lg"><MovieItem movie={movie}/></div>
        ))}
      </div>
      )}
    </div>
  )
}

export default MovieList;