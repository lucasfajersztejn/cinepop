import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCinemasDetails } from "../services/api.service";
import CinemaDetails from "../components/cinemas/cinemas-details/cinema-details";

function CinemaDetail() {
  const { id } = useParams();
  const [cinema, setCinema] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovie() {
      try {
        const { data } = await getCinemasDetails(id);
        setCinema(data);
      } catch(error) {
        if (error.response?.status == 404) navigate('/');
      }
    }

    fetchMovie();
  }, [id]);

  console.log(cinema);

  return (
    <section className="mt-40 lg:mt-44 xl:mt-48 mx-[5%]">
      <CinemaDetails {...cinema} />
    </section>
  )
}

export default CinemaDetail;