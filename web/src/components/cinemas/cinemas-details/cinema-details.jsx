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

      <img src={bgAvatar} alt="Theater"/>

      <img src={avatar} alt="Cinema theater"/>


      <h2>{name}</h2>

      <p>{description}</p>

      <div>
        <h4><u>Contacto:</u></h4>
        <p>{address}</p>
        <p>{phoneNumber}</p>
        {web && <a href={web} target="_blank">{web}</a>}
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