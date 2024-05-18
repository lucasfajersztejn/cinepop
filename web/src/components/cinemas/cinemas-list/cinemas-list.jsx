import { useEffect, useState } from "react";
import { getCinemas } from "../../../services/api.service";
import CinemasCard from "../cinemas-card/cinemas-card";
import movieLoader from "../../../assets/loaders/loader_claqueta.gif";
import { useNavigate, useSearchParams } from "react-router-dom";
import Map from "../../google/map/map";
import AutocompleteInput from "../../google/autocomplete/autocomplete-input";

function CinemasList() {
  const [cinemas, setCinemas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [locations, setLocations] = useState([]);

  const lat = searchParams.get('lat') || 0
  const lng = searchParams.get('lng') || 0
  const address = searchParams.get('address')

  console.log(lat)
  console.log(lng)
  useEffect(() => {
    async function fetchCinemas() {
      try {
        const { data: cinemas } = await getCinemas(lat, lng);
        setCinemas(cinemas);
        console.log(cinemas)
        setIsLoading(false);
      } catch (error) {
        if (error.response?.status == 404) navigate("/");
      }
    }
    console.info(123);
    fetchCinemas();
  }, [searchParams]);

  const handlePlaceChange = ({ address, lat, lng }) => {
    setSearchParams({
      address,
      lat,
      lng
    });
  };

  const handleCinemasUpdate = (cine) => {
    const locations = cine.map(({ name, location }) => ({
      title: name,
      lat: location[0],
      lng: location[1]
    }));
    setLocations(locations);
  };

  return (
    <section>
      {isLoading ? (
        <img src={movieLoader} alt="Loader movie"/>
      ) : (
        <div>
        <AutocompleteInput className={""} onPlaceChange={handlePlaceChange} />
        <button onClick={() => setSearchParams({})}>Borrar</button>
        {/* <Map
        className="mt-2 rounded-xl shadow-lg"
        center={{
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        }}
        markers={locations}
      /> */}
        
        {cinemas.map((cinema, index) => (
          <div className="mt-2 lg:mt-5 mx-[10%] " key={cinema.id}>
            <div className={ index % 2 === 0 ? "md:flex gap-4 mt-2" : "mt-2 md:flex md:flex-row-reverse gap-4" }>
              <CinemasCard {...cinema} id={cinema.id} />
              <Map
                  key={index}
                  className="mt-2 rounded-xl shadow-lg"
                  center={{
                    lat: parseFloat(cinema.location[0]),
                    lng: parseFloat(cinema.location[1]),
                  }}
                  markers={{  
                    name: cinema.name, 
                    lat: parseFloat(cinema.location[0]), 
                    lng: parseFloat(cinema.location[1]) 
                  }}
                  description={cinema.address}
                  image={cinema.bgAvatar}
                />
            </div>
          </div>
        ))}
        </div>
      )}
      
    </section>
  );
}

export default CinemasList;

//markers={{ name: cinema.name, lat: parseFloat(cinema.location[0]), lng: parseFloat(cinema.location[1]) }}
