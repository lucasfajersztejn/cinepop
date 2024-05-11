import { useEffect, useState } from "react";
import Map from "../../google/map/map";
import { Navigate } from "react-router-dom";

function CinemaDetails({ name, movieTheaters, description, web, avatar, bgAvatar, phoneNumber, address }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      setIsLoading(false);
    } catch (error) {
      if (error.response?.status == 404) Navigate("/");
    }
  }, []);
  
  return (
    <section>
      <div className="relative bg-cover bg-center h-28 md:h-40 lg:h-64 xl:h-96 opacity-[40%] rounded-t-xl" style={{backgroundImage: `url(${bgAvatar})`}}></div>

      <div className="flex flex-col lg:flex-row gap-4 mt-3">
        <div className="flex flex-col gap-3">
          <img className="mx-auto rounded-xl" src={avatar} alt="Cinema theater"/>

          <div className="flex flex-col p-2 text-white border border-slate-500 bg-slate-700/70 shadow-xl rounded-xl">
            <h4 className="ms-2"><u>Contacto:</u></h4>
            <p className="ms-2">{address}</p>
            <p className="ms-2">{phoneNumber}</p>
            {web && <a className="ms-2" href={web} target="_blank">{web}</a>}
          </div>
        </div>

        <div className="flex flex-col gap-2 p-3 justify-start border border-slate-500 bg-slate-800/70 rounded-xl">
          <h2 className="text-white font-semibold underline text-xl lg:text-2xl">{name}</h2>
          <p className="text-white text-lg lg:text-xl">{description}</p>
        </div>
      </div>
      {/* {isLoading ? (
        <p>Esta cargando...</p>
      ) : (
        <Map
        className={"m-4 rounded-xl shadow-lg"}
        center={{
          lat: parseFloat(location[1]),
          lng: parseFloat(location[0]),
        }}
        markers={{ 
          name: name, 
          lat: parseFloat(location[1]), 
          lng: parseFloat(location[0]) 
        }}
      />
      )}
       */}

    </section>
  )
}

export default CinemaDetails;