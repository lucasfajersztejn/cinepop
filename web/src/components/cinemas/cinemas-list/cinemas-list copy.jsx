import { useEffect, useState } from "react";
import { getCinemas } from "../../../services/api.service";
import CinemasCard from "../cinemas-card/cinemas-card";
import movieLoader from "../../../assets/loaders/loader_claqueta.gif";
import { useNavigate } from "react-router-dom";
import Map from "../../google/map/map";

function CinemasListPrueba({ lat, lng, onUpdateCinemas }) {
  const [cinemas, setCinemas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCinemas() {
      try {
        const query = {};
        if (lat & lng) {
          query.lat = lat,
          query.lng = lng
        }
        const { data: cinemas } = await getCinemas(query);
        setCinemas(cinemas);
        onUpdateCinemas(cinemas)
        setIsLoading(false);
      } catch (error) {
        if (error.response?.status == 404) navigate("/");
      }
    }

    fetchCinemas();
  }, []);

  return (
    <section>
      {isLoading ? (
        <img src={movieLoader} alt="Loader movie"/>
      ) : (
        cinemas.map((cinema, index) => (
          <div className="mt-2 lg:mt-5 mx-[10%] " key={cinema.id}>
            <div className={ index % 2 === 0 ? "md:flex gap-4 mt-2" : "mt-2 md:flex md:flex-row-reverse gap-4" }>
              <CinemasCard {...cinema} id={cinema.id} />
              <Map
                  key={index}
                  className="mt-2 rounded-xl shadow-lg"
                  center={{
                    lat: parseFloat(cinema.location[1]),
                    lng: parseFloat(cinema.location[0]),
                  }}
                  markers={{  
                    name: cinema.name, 
                    lat: parseFloat(cinema.location[1]), 
                    lng: parseFloat(cinema.location[0]) 
                  }}
                  description={cinema.address}
                  image={cinema.bgAvatar}
                />
            </div>
          </div>
        ))
      )}
    </section>
  );
}

export default CinemasListPrueba;

//markers={{ name: cinema.name, lat: parseFloat(cinema.location[0]), lng: parseFloat(cinema.location[1]) }}
