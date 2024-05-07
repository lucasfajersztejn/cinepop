import { useEffect, useState } from "react"
import { getCinemas } from "../../../services/api.service";
import CinemasCard from "../cinemas-card/cinemas-card";
import movieLoader from "../../../assets/loaders/loader_claqueta.gif";
import { useNavigate } from "react-router-dom";

function CinemasList() {
  const [cinemas, setCinemas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCinemas() {
      try {
        const {data: cinemas} = await getCinemas();
        setCinemas(cinemas);
        setIsLoading(false);
      } catch(error) {
        if (error.response?.status == 404) navigate('/');
      }
    }

    fetchCinemas();
  }, [])
  
  console.log(cinemas)

  return (
    <section>
      {cinemas.map((cinema) => (
        <div className="grid mt-28 md:grid-cols-2 lg:grid-cols-3 gap-4 md:mt-40 lg:mt-44 xl:mt-48 m-10" key={cinema.id}>
          <CinemasCard {...cinema} id={cinema.id}/>
        </div>
      ))}
    </section>
  )
}

export default CinemasList;
