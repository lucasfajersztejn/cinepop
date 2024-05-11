import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { getCinemas } from "../../../services/api.service";
import { Link } from "react-router-dom";
import Map from "../../google/map/map";


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

  const filterCinemas = cinemas.filter((cinema) => cinema.priority === 1);
  
  return (
    <div className="flex flex-col justify-center items-center">

      <div className="">
      {/* <Map
        {filterCinemas.map((cinema, index) => (
          
        ))}
        /> */}
      </div>

      <div>
        <Link to={`/cinemas`}>VER MÁS CINES</Link>
      </div>
      

{/* <div key={cinema.id} className="rounded-xl flex flex-col lg:flex-row justify-around items-center gap-5 mt-5 lg:min-w-[768px] xl:min-w-[1024px] bg-slate-500">
      <div className="flex flex-col justify-center items-center">
        <img className="rounded-xl h-5/6 w-96 object-contain" src={cinema.avatar} alt="Cinema photo profile"/>
        <h2 className="text-white text-xl font-semibold">{cinema.name}</h2>
      </div>

      <div className="w-72 lg:w-96 bg-slate-700">
        <Map
            key={index}
            className={"rounded-xl shadow-lg"}
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
          <p className="text-white text-center">ALGO DE CONTENIDO</p>
      </div>
    </div> */}


      {/* <Carousel
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
       */}
    </div>
  )
}

export default CinemasCarrousel;