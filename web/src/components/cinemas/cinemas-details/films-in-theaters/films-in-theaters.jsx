import { useEffect, useState } from "react";

function FilmsInTheaters({ movies, id, priority }) {
  const [weekDay, setWeekDay] = useState("");
  const [selectedMoviePrices, setSelectedMoviePrices] = useState({}); // Estado para almacenar los precios de las entradas de cada película seleccionada
  const [availableHours, setAvailableHours] = useState([]);
  // const [isCombo, setIsCombo] = useState(false);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [combo, setCombo] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [hourSelected, setHourSelected] = useState(-1);


  useEffect(() => {
    const newTotalPrice = calculateTotalPrice();
    setTotalPrice(newTotalPrice);
  }, [selectedMoviePrices]);



  /**************** FILTRAR PELICULAS Y DÍAS ***************/
  const targetDate = new Date("2024-03-15");
  const endDate = new Date("2024-05-15");
  const filteredMovies = movies.filter((movie) => {
    const movieAverage = parseInt(movie.vote_average);
    const releaseDate = new Date(movie.release_date);
      if (priority === 1) {
        return releaseDate >= targetDate && releaseDate <= endDate
      } else if (priority === 2) {
        return releaseDate >= targetDate && releaseDate <= endDate && movieAverage <= 6 
      } else if (priority === 3) {
        return releaseDate >= targetDate && releaseDate <= endDate && movieAverage >= 7
      } else if (priority === 4) {
        return movieAverage >= 8
      }
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



  const handleTicketPrice = (movieId, event) => {
    const price = calculateTicketPrice(event.target.value);
    setSelectedMoviePrices((prevPrices) => ({
      ...prevPrices,
      [movieId]: {
        ticketPrice: price,
        comboPrice: prevPrices[movieId]?.comboPrice ?? 0, // Mantener el precio del combo si ya está definido para esta película
      },
    }));
  };

  const handleComboPrice = (movieId, event) => {
    const selectedCombo = event.target.value;
    let comboPrice = 0;
    if (selectedCombo === "1") {
      comboPrice = 15;
    } else if (selectedCombo === "2") {
      comboPrice = 12;
    } else if (selectedCombo === "3") {
      comboPrice = 10;
    } else if (selectedCombo === "4") {
      comboPrice = 7;
    }
    setSelectedMoviePrices((prevPrices) => ({
      ...prevPrices,
      [movieId]: {
        ticketPrice: prevPrices[movieId]?.ticketPrice ?? 0, // Mantener el precio de la entrada si ya está definido para esta película
        comboPrice: comboPrice,
      },
    }));
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

  const calculateTotalPrice = () => {
    let totalTicketsPrice = 0;
    for (const movieId in selectedMoviePrices) {
      const moviePrices = selectedMoviePrices[movieId];
      totalTicketsPrice += moviePrices.ticketPrice;
      if (moviePrices.comboPrice) {
        totalTicketsPrice += moviePrices.comboPrice; // Añadir el precio del combo al total
      }
    }
    return totalTicketsPrice;
  };

  
  return (
    <div className="flex flex-col gap-2 p-3 justify-start border border-slate-500 bg-slate-800/70 rounded-xl mt-4">
      <div className="bg-slate-400 p-2 rounded-lg flex flex-wrap  sm:flex-row gap-2 md:gap-4 justify-center items-center">
        <span className="text-white font-normal text-lg underline">
          Día:
        </span>
        <select
          onChange={handleDays}
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

          
      </div>

      {filteredMovies.map((filterMovie) => (
        <div
        key={filterMovie.idMovie}
        className="flex flex-col lg:flex-row items-center lg:gap-5 mt-3"
        >
          <img
            className="rounded-3xl w-1/2 md:w-1/3 lg:w-1/5"
            src={`https://image.tmdb.org/t/p/original/${filterMovie.poster_path}`}
            alt="Poster image"
          />

          <div className="flex flex-col gap-3">
            <h2 className="text-white font-semibold text-2xl">
              {filterMovie.title}
            </h2>
            <p className="text-white text-lg">{filterMovie.overview}</p>

            <div className="flex flex-wrap gap-2">
              {availableHours.map((hour, index) => (
                <span
                  key={index}
                  className={`text-white bg-red-500 hover:bg-red-400 rounded-3xl ring-red-300 ring-2 p-2 
                  ${
                    hourSelected === index
                      ? " bg-teal-600 hover:bg-teal-400"
                      : "bg-red-500"
                  }`}
                  onClick={() => handleHourPicked(index)}
                >
                  {hour}
                </span>
              ))}
            </div>
          </div>
          
          {/* Contenido de cada película */}
          <div className="flex gap-5 lg:flex-col lg:gap-2 justify-center items-center">
            {/* Entradas */}
            <span className="text-white font-medium text-lg">Entradas</span>
            <input
              type="number"
              className="p-2 w-16"
              min={0}
              onChange={(event) => handleTicketPrice(filterMovie.idMovie, event)}
            />

            {/* Combo */}
            <div>
              <span className="text-white font-medium text-lg">Combos:</span>
              <select
                className="appearance-none p-2 w-20"
                onChange={(event) => handleComboPrice(filterMovie.idMovie, event)}
              >
                <option value={1}>combo 1</option>
                <option value={2}>combo 2</option>
                <option value={3}>combo 3</option>
                <option value={4}>combo 4</option>
              </select>
            </div>

            {/* Total */}
            <div>
              <span className="text-white font-semibold text-2xl underline">Total</span>
              <h3 className="bg-white text-black text-2xl font-bold mt-2 p-2">
              {selectedMoviePrices[filterMovie.idMovie]?.ticketPrice != null
                ? selectedMoviePrices[filterMovie.idMovie]?.ticketPrice + (selectedMoviePrices[filterMovie.idMovie]?.comboPrice ?? 0)
                : 0} €
              </h3>
            </div>
          </div>

          
        </div>
      ))}
      
    </div>
  );
}

export default FilmsInTheaters;
