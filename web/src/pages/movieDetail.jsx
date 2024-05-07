import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api.service";
import MovieDetails from "../components/movies/movie-detail/movie-details";
import movieLoader from "../assets/loaders/loader_claqueta.gif";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovie() {
      try {
        const { data } = await getMovieDetails(id)
        setMovie(data);
        setIsLoading(false)
      } catch(error){
        if (error.response?.status == 404) navigate('/');
      }
    }

    fetchMovie();
  }, [id])

  return (
    <div className="mt-40 lg:mt-44 xl:mt-48 m-10">
      {isLoading ? (
        <img src={movieLoader} alt="Loader movie"/>
      ) : (
        <MovieDetails movie={movie}/>
      )}
    </div>
  )
}

export default MovieDetail;