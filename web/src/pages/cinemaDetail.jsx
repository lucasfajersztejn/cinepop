import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCinemasDetails, getMovies } from "../services/api.service";
import AuthContext from "../context/auth.context";
import CinemaDetails from "../components/cinemas/cinemas-details/cinema-details";

function CinemaDetail() {
  const { id } = useParams();
  const [cinema, setCinema] = useState({});
  const [movies, setMovies] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovie() {
      try {
        const { data } = await getCinemasDetails(id);
        const { data: movies } = await getMovies();
        setMovies(movies)
        setCinema(data);
      } catch(error) {
        if (error.response?.status == 404) navigate('/');
      }
    }
    fetchMovie();
  }, [id]);



  return (
    <section className="mt-40 lg:mt-44 xl:mt-48 mx-[5%]">
      <CinemaDetails {...cinema} movies={movies} user={user} cinema={cinema} />
    </section>
  )
}

export default CinemaDetail;