import { useEffect, useState } from "react";
import Map from "../../google/map/map";
import { Navigate, useNavigate } from "react-router-dom";
import FilmsInTheaters from "./films-in-theaters/films-in-theaters";
import { deleteCinema } from "../../../services/api.service";
import EditCinema from "./edit-cinema/edit-cinema";


function CinemaDetails({
  name,
  movieTheaters,
  description,
  web,
  avatar,
  bgAvatar,
  phoneNumber,
  address,
  id,
  priority,
  movies,
  cinema,
  user,
}) {

  const [visibleEdit, setVisibleEdit] = useState(true)
  const navigate = useNavigate()


  const handleDeleteCinema = async () => {
    if (!window.confirm('estás Seguro?')) {
      return
    }

    try {
      await deleteCinema(id);
      navigate("/cinemas");
    } catch (error) {
      console.error(error);
    }
  } 

  const handleVisibleEdit = () => {
    setVisibleEdit(prev => !prev);
  }

  return (
    <section className="mx-[5%] mb-5">
          <div
            className="relative bg-cover bg-center h-28 md:h-40 lg:h-64 xl:h-96 opacity-[40%] rounded-t-xl"
            style={{ backgroundImage: `url(${bgAvatar})` }}
          ></div>

          <div className="flex flex-col lg:flex-row gap-4 mt-3">
            <div className="flex flex-col gap-3">
              <img
                className="mx-auto rounded-xl"
                src={avatar}
                alt="Cinema theater"
              />

              <div className="flex flex-col p-2 text-white border border-slate-500 bg-slate-700/70 shadow-xl rounded-xl">
                <h4 className="ms-2">
                  <u>Contacto:</u>
                </h4>
                <p className="ms-2">{address}</p>
                <p className="ms-2">{phoneNumber}</p>
                {web && (
                  <a className="ms-2 truncate" href={web} target="_blank">
                    {web}
                  </a>
                )}
              </div>

              {user && 
                <div className="border h-24 gap-3 border-slate-300 w-44 md:w-full mt-3 shadow-lg bg-slate-600 rounded-xl flex flex-col mx-auto md:flex-row md:gap-5 justify-center items-center">
                  <button className="text-white bg-red-500 shadow-lg px-4 py-1 rounded-md" onClick={handleDeleteCinema}>Borrar cine</button>
                  <button className="text-white bg-red-500 shadow-lg px-4 py-1 rounded-md" onClick={handleVisibleEdit}>Editar cine</button>
                </div>
              }

            </div>
            
            {visibleEdit && 
            <div className="flex flex-col gap-2 p-3 justify-start border border-slate-500 bg-slate-800/70 rounded-xl">
              <h2 className="text-white font-semibold underline text-xl lg:text-2xl">
                {name}
              </h2>
              <p className="text-white text-lg lg:text-xl">{description}</p>
            </div>
            }

            {!visibleEdit && <EditCinema cinema={cinema}/>}
          </div>

          <div className="">
            <FilmsInTheaters movies={movies} id={id} priority={priority} web={web}/>
          </div>
    </section>
  );
}

export default CinemaDetails;

// availableHours={availableHours}
// handleHourPicked={handleHourPicked}
// handleTicketPrice={handleTicketPrice}
// totalPrice={totalPrice}
// hourSelected={hourSelected}
// flex flex-col lg:flex-row items-center lg:gap-5 mt-3