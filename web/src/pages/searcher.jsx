import { useEffect, useState } from "react";
import AutocompleteInput from "../components/google/autocomplete/autocomplete-input";
import { getCinemas, getCinemasFiltered } from "../services/api.service";
import { useNavigate, useSearchParams } from "react-router-dom";
import Map from "../components/google/map/map";
import CinemasListPrueba from "../components/cinemas/cinemas-list/cinemas-list copy";


function Searcher() {
  const [cinemas, setCinemas] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const address = searchParams.get('address')

  useEffect(() => {
    async function fetchCinemas() {
      try {
        const { data: cinemas } = await getCinemasFiltered(lat, lng, address);
        console.log()
        setCinemas(cinemas);
        setIsLoading(false);
      } catch (error) {
        if (error.response?.status == 404) navigate("/");
      }
    }
    fetchCinemas();
  }, []);

  

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

  console.log(locations)

  return (
    <section className="mt-40 lg:mt-44 xl:mt-48 m-10">
      <AutocompleteInput className={""} onPlaceChange={handlePlaceChange} />
      <Map
        className="mt-2 rounded-xl shadow-lg"
        center={{
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        }}
        markers={locations}
      />
      <CinemasListPrueba lat={lat} lng={lng} onUpdateCinemas={handleCinemasUpdate}/>
    </section>
  );
}

export default Searcher;