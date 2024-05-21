import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCinemas, getMovieDetails } from "../services/api.service";
import MovieDetails from "../components/movies/movie-detail/movie-details";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [cinemas, setCinemas] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovie() {
      try {
        const { data } = await getMovieDetails(id)
        const {data: cinemas} = await getCinemas();
        setMovie(data);
        setCinemas(cinemas)
        setIsLoading(false)
      } catch(error){
        if (error.response?.status == 404) navigate('/');
      }
    }

    fetchMovie();
  }, [id])

  return (
    <div className="">
      {isLoading ? (
        <div
          className="flex flex-col bg-neutral-300 w-56 h-64 animate-pulse rounded-xl p-4 gap-4 mt-[50%]"
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
        <MovieDetails movie={movie} cinemas={cinemas}/>
      )}
    </div>
  )
}

export default MovieDetail;