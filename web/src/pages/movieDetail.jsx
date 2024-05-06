import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api.service";
import MovieDetails from "../components/movies/movie-detail/movie-details";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovie() {
      try {
        const { data } = await getMovieDetails(id)
        setMovie(data);
      } catch(error){
        if (error.response?.status == 404) navigate('/');
      }
    }

    fetchMovie();
  }, [id])

  console.log(movie)


  return (
    <div className="mt-40 lg:mt-44 xl:mt-48 m-10">
      <MovieDetails movie={movie}/>
    </div>
  )
}

export default MovieDetail;