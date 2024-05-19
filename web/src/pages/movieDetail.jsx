import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCinemas, getMovieDetails } from "../services/api.service";
import MovieDetails from "../components/movies/movie-detail/movie-details";
import movieLoader from "../assets/loaders/loader_claqueta.gif";

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
        <img src={movieLoader} alt="Loader movie"/>
      ) : (
        <MovieDetails movie={movie} cinemas={cinemas}/>
      )}
    </div>
  )
}

export default MovieDetail;