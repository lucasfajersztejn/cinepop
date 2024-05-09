import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { getCinemas } from "../../../services/api.service";
import { Link } from "react-router-dom";


function CinemasCarrousel() {
  const [cinemas, setCinemas] = useState([])

  useEffect(() => {
    async function fetchCinemas() {
      try{
        const {data: cinemas} = await getCinemas();
        setCinemas(cinemas); 
      } catch(error) {
        console.error(error)
      }
    }
    fetchCinemas();
  }, []);
  
  return (
    <div className="flex flex-col justify-center items-center">
      <Carousel
        className="my-3 flex justify-center max-h-[200px] md:min-h-[600px]"
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
      >
        {cinemas.map((cinema) => (
          
            <div className="rounded-3xl">
              <img
                className="rounded-3xl max-h-[200px] md:min-h-[600px] w-full object-contain z-20"
                src={cinema.avatar}
                alt={`Photo of a Movie theater`}
              />

              <h2>{cinema.name}</h2>
              <Link to={`/cinemas/${cinema.id}`} className="mt-48">Ver Cine</Link>
            </div>
        ))}
      </Carousel>
    </div>
  )
}

export default CinemasCarrousel;