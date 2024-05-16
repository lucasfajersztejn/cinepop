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
  user,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [weekDay, setWeekDay] = useState("");
  const [availableHours, setAvailableHours] = useState([]);
  const [isCombo, setIsCombo] = useState(false);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [combo, setCombo] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [hourSelected, setHourSelected] = useState(-1);
  const [visibleEdit, setVisibleEdit] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const newTotalPrice = ticketPrice + combo;
    setTotalPrice(newTotalPrice);
    setIsLoading(false);
  }, [movies, id, priority, ticketPrice, combo]);

  const targetDate = new Date("2024-03-15");
  const endDate = new Date("2024-05-15");
  const filteredMovies = movies.filter((movie) => {
    const releaseDate = new Date(movie.release_date);
    return (
      priority === 1 && releaseDate >= targetDate && releaseDate <= endDate
    );
  });

  const filterMovies = filteredMovies.map((movie) =>
    movie.timesheets.filter((timesheet) => timesheet.idCinema === id)
  );
  const allSchedules = filterMovies.flatMap((movie) =>
    movie.map((timesheet) => timesheet.schedules)
  );

  const handleDays = (event) => {
    const selectedDay = event.target.value.toLowerCase();
    setWeekDay(selectedDay);
    const hours = allSchedules.map((movie) => movie[selectedDay]);
    const uniqueHours = [...new Set(hours.flat())];
    setAvailableHours(uniqueHours);
  };

  const handleCombo = () => {
    setIsCombo((prev) => !prev);
    if (isCombo) setCombo(0);
  };

  const handleTicketPrice = (event) => {
    const price = calculateTicketPrice(event.target.value);
    setTicketPrice(price);
  };

  const handleComboPrice = (event) => {
    const selectedCombo = event.target.value;
    if (selectedCombo === "1") {
      setCombo(15);
    } else if (selectedCombo === "2") {
      setCombo(12);
    } else if (selectedCombo === "3") {
      setCombo(10);
    } else if (selectedCombo === "4") {
      setCombo(7);
    }
  };

  const calculateTicketPrice = (numTickets) => {
    if (priority === 1) return numTickets * 5;
    else if (priority === 2) return numTickets * 4;
    else if (priority === 3) return numTickets * 3;
    else if (priority === 4) return numTickets * 2;
    else return 0;
  };

  const handleHourPicked = (index) => {
    setHourSelected(index);
  };

  const handleDeleteCinema = async () => {
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
    <section>
      {isLoading ? (
        <p>cargando...</p>
      ) : (
        <div>
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
                <div className="border h-24 gap-3 border-slate-300 w-44 mt-3 shadow-lg bg-slate-600 rounded-xl flex flex-col justify-center items-center">
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

            {!visibleEdit && <EditCinema />}
          </div>

          <div className="flex flex-col gap-2 p-3 justify-start border border-slate-500 bg-slate-800/70 rounded-xl mt-4">
            <div className="bg-slate-400 p-2 rounded-lg flex flex-wrap  sm:flex-row gap-2 md:gap-4 justify-center items-center">
              <span className="text-white font-normal text-lg underline">
                Día:
              </span>
              <select
                onClick={handleDays}
                className="text-center rounded-xl p-1 font-semibold ring-2 ring-red-500"
              >
                <option value="monday">Lunes</option>
                <option value="tuesday">Martes</option>
                <option value="wednesday">Miércoles</option>
                <option value="thursday">Jueves</option>
                <option value="friday">Viernes</option>
                <option value="saturday">Sábado</option>
                <option value="sunday">Domingo</option>
              </select>

              <span className="text-white font-normal text-lg underline">
                Combo:{" "}
              </span>
              <input
                type="checkbox"
                onClick={handleCombo}
                className="text-center rounded-xl p-4   font-semibold ring-2 ring-red-500"
              />

              {isCombo && (
                <div>
                  <span className="text-white font-normal text-lg underline me-3">
                    combos:
                  </span>
                  <select
                    onChange={handleComboPrice}
                    className="appearance-none text-center rounded-xl p-1 font-semibold ring-2 ring-red-500"
                  >
                    <option value={1}>combo 1</option>
                    <option value={2}>combo 2</option>
                    <option value={3}>combo 3</option>
                    <option value={4}>combo 4</option>
                  </select>
                </div>
              )}
            </div>

            {filteredMovies.map((filterMovie) => (
              <div
                key={filterMovie.idMovie}
                className="flex flex-col lg:flex-row items-center lg:gap-5 mt-3"
              >
                <FilmsInTheaters
                  filterMovie={filterMovie}
                  availableHours={availableHours}
                  handleHourPicked={handleHourPicked}
                  handleTicketPrice={handleTicketPrice}
                  totalPrice={totalPrice}
                  hourSelected={hourSelected}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default CinemaDetails;
