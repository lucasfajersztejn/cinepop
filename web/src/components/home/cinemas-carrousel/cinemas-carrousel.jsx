import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { getCinemas } from "../../../services/api.service";


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
        className="my-3 flex justify-center"
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
      >
        {cinemas.map((cinema) => (
          <div>
            <img
              className="rounded-3xl shadow-lg min-h-[600px] w-full md:object-cover object-contain z-20"
              src={cinema.avatar}
              alt={`Photo of a Movie theater`}
            />
        
            <h2>{cinema.name}</h2>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default CinemasCarrousel;