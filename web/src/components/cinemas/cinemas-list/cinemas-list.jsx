import { useEffect, useRef, useState } from "react";
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
  const autoCompleteInputRf = useRef('autoCompleteInput');

  const [searchParams, setSearchParams] = useSearchParams();
  const [locations, setLocations] = useState([]);

  const lat = searchParams.get('lat') || 0
  const lng = searchParams.get('lng') || 0
  const address = searchParams.get('address')

  useEffect(() => {
    async function fetchCinemas() {
      try {
        const { data: cinemas } = await getCinemas(lat, lng);
        setCinemas(cinemas);
        setIsLoading(false);
      } catch (error) {
        if (error.response?.status == 404) navigate("/");
      }
    }
    fetchCinemas();
  }, [searchParams]);

  const handlePlaceChange = ({ address, lat, lng }) => {
    setSearchParams({
      address,
      lat,
      lng
    });
  };

  console.info({autoCompleteInputRf})
  const handleClearInput = () => {
    setSearchParams({});
    if (autoCompleteInputRf.current) {
      autoCompleteInputRf.current.value = "";
    }
  };

  return (
    <section>
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
        <div>
          <div className="flex gap-2 justify-center items-center">
            <AutocompleteInput reference={autoCompleteInputRf} className={""} onPlaceChange={handlePlaceChange} />
            <button 
              onClick={handleClearInput}
              className="text-white font-semibold bg-red-500 hover:bg-red-400 w-8 shadow-lg py-1 rounded-md mt-5"
            >
              <box-icon name='x' color='#ffffff' ></box-icon>
            </button>
          </div>
        {cinemas.map((cinema, index) => (
          <div className="mt-2 lg:mt-5 mx-[10%] " key={cinema.id}>
            <div className={ index % 2 === 0 ? "md:flex gap-4 mt-2" : "mt-2 md:flex md:flex-row-reverse gap-4" }>
              <CinemasCard {...cinema} id={cinema.id} />
              <Map
                  key={index}
                  className="mt-2 rounded-xl shadow-lg"
                  center={{
                    lat: parseFloat(cinema.location.coordinates[1]),
                    lng: parseFloat(cinema.location.coordinates[0]),
                  }}
                  markers={{  
                    name: cinema.name, 
                    lat: parseFloat(cinema.location.coordinates[1]), 
                    lng: parseFloat(cinema.location.coordinates[0]) 
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
