import { useEffect, useState } from "react";
import combo1 from "../../../../assets/combos/1.jpg";
import combo2 from "../../../../assets/combos/2.jpg";
import combo3 from "../../../../assets/combos/3.png";
import combo4 from "../../../../assets/combos/4.jpg";

function FilmsInTheaters({ movies, id, priority, web }) {
  const [weekDay, setWeekDay] = useState("");
  const [selectedMoviePrices, setSelectedMoviePrices] = useState({});
  const [availableHours, setAvailableHours] = useState([]);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [combo, setCombo] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [hourSelected, setHourSelected] = useState({});


  useEffect(() => {
    const newTotalPrice = calculateTotalPrice();
    setTotalPrice(newTotalPrice);
  }, [selectedMoviePrices]);

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
    // const hours = allSchedules.map((movie) => movie[selectedDay]);
    // const uniqueHours = [...new Set(hours.flat())];
    // setAvailableHours(uniqueHours);

    const hoursByMovie = {};
    filteredMovies.forEach((movie) => {
      const movieSchedules = movie.timesheets.find(timesheet => timesheet.idCinema === id)?.schedules;
      if (movieSchedules && movieSchedules[selectedDay]) {
        hoursByMovie[movie.idMovie] = [...new Set(movieSchedules[selectedDay])];
      }
    });

    setAvailableHours(hoursByMovie);
  };

  const handleTicketPrice = (movieId, event) => {
    const price = calculateTicketPrice(event.target.value);
    setSelectedMoviePrices((prevPrices) => ({
      ...prevPrices,
      [movieId]: {
        ticketPrice: price,
        comboPrice: prevPrices[movieId]?.comboPrice ?? 0,
      },
    }));
  };

  const handleComboPrice = (movieId, event) => {
    const selectedCombo = event.target.value;
    let comboPrice = 0;
    let comboNumber = 0;
    if (selectedCombo === "1") {
      comboPrice = 15;
      comboNumber = 1;
    } else if (selectedCombo === "2") {
      comboPrice = 12;
      comboNumber = 2;
    } else if (selectedCombo === "3") {
      comboPrice = 10;
      comboNumber = 3;
    } else if (selectedCombo === "4") {
      comboPrice = 7;
      comboNumber = 4;
    } else {
      comboPrice = 0;
    }
    setSelectedMoviePrices((prevPrices) => ({
      ...prevPrices,
      [movieId]: {
        ticketPrice: prevPrices[movieId]?.ticketPrice ?? 0, 
        comboPrice: comboPrice,
        comboNumber,
      },
    }));
  };

  const calculateTicketPrice = (numTickets) => {
    if (priority === 1) {
      setTicketPrice(5);
      return numTickets * 5;
    } else if (priority === 2) {
      setTicketPrice(4);
      return numTickets * 4;
    } else if (priority === 3) {
      setTicketPrice(3);
      return numTickets * 3;
    } else if (priority === 4) {
      setTicketPrice(2);
      return numTickets * 2;
    } else return 0;
  };

   const handleHourPicked = (movieId, hour) => {
    setHourSelected((prevSelected) => ({
      ...prevSelected,
      [movieId]: hour,
    }));

    setSelectedMoviePrices((prevPrices) => ({
      ...prevPrices,
      [movieId]: {
        ...prevPrices[movieId],
        hour,
      },
    }));
  };


  const calculateTotalPrice = () => {
    let totalTicketsPrice = 0;
    for (const movieId in selectedMoviePrices) {
      const moviePrices = selectedMoviePrices[movieId];
      totalTicketsPrice += moviePrices.ticketPrice;
      if (moviePrices.comboPrice) {
        totalTicketsPrice += moviePrices.comboPrice; 
      }
    }
    return totalTicketsPrice;
  };
  
  return (
    <div className="flex flex-col gap-2 p-3 justify-start border border-slate-500 bg-slate-800/70 rounded-xl mt-4">

      <div className="flex flex-col bg-slate-700/60 rounded-xl w-full">
        <h4 className="text-center text-white font-bold text-2xl mt-2 underline">Combos</h4>
        <div className="flex flex-wrap lg:flex-row justify-evenly items-center gap-4 mb-4">
          <div className="flex flex-col justify-center items-center">
            <span className="text-white font-semibold text-lg">Combo 1</span>
            <img src={combo1} className="h-[200px] object-cover" alt="Combo promotion 1"/>
          </div>

          <div className="flex flex-col justify-center items-center">
            <span className="text-white font-semibold text-lg">Combo 2</span>
            <img src={combo2} className="h-[200px] object-cover" alt="Combo promotion 2"/>
          </div>

          <div className="flex flex-col justify-center items-center">
            <span className="text-white font-semibold text-lg">Combo 3</span>
            <img src={combo3} className="h-[200px] object-cover" alt="Combo promotion 3"/>
          </div>

          <div className="flex flex-col justify-center items-center">
            <span className="text-white font-semibold text-lg">Combo 4</span>
            <img src={combo4} className="h-[200px] object-cover" alt="Combo promotion 4"/>
          </div>
        </div>
      </div>

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
              {availableHours[filterMovie.idMovie]?.map((hour, index) => (
                <span
                  key={index}
                  className={`text-white bg-red-500 hover:bg-red-400 rounded-3xl ring-red-300 ring-2 cursor-pointer p-2 ${
                    hourSelected[filterMovie.idMovie] === hour ? " bg-teal-600 hover:bg-teal-400" : "bg-red-500"
                  }`}
                  onClick={() => handleHourPicked(filterMovie.idMovie, hour)}
                >
                  {hour}
                </span>
              ))}
            </div>
          </div>
          
          {/* Contenido de cada película */}
          <div className="flex gap-5 w-full md:w-20 lg:flex-col lg:gap-2 justify-center items-center">
            {/* Entradas */}
            <div className="flex flex-col justify-center items-center">
              <span className="text-white font-medium text-lg">Entradas</span>
              <input
                type="number"
                className="rounded-md p-2 w-16"
                min={0}
                onChange={(event) => handleTicketPrice(filterMovie.idMovie, event)}
            />
            </div>

            {/* Combo */}
            <div className="flex flex-col justify-center items-center">
              <span className="text-white font-medium text-lg">Combos:</span>
              <select
                className="appearance-none rounded-md p-2 w-20"
                onChange={(event) => handleComboPrice(filterMovie.idMovie, event)}
              >
                <option value={0}></option>
                <option value={1}>combo 1</option>
                <option value={2}>combo 2</option>
                <option value={3}>combo 3</option>
                <option value={4}>combo 4</option>
              </select>
            </div>

            {/* Total */}
            <div className="flex flex-col justify-center items-center">
              <span className="text-white font-semibold text-2xl underline">Total</span>
              <h3 className="bg-white rounded-md text-black text-2xl font-bold mt-2 p-2">
              {selectedMoviePrices[filterMovie.idMovie]?.ticketPrice != null
                ? selectedMoviePrices[filterMovie.idMovie]?.ticketPrice + (selectedMoviePrices[filterMovie.idMovie]?.comboPrice ?? 0)
                : 0} €
              </h3>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-slate-700/70 flex flex-col justify-evenly rounded-lg bottom-0 w-full mt-10">
        {filteredMovies.map((filterMovie, index) => (
          <div key={filterMovie.idMovie} className="">
            {Object.keys(selectedMoviePrices).includes(String(filterMovie.idMovie)) ? (
              <div className="text-white shadow-lg flex gap-2 p-2 border border-slate-500 rounded-lg m-2">
                <h3 className="truncate">{filterMovie.title}</h3>
                <p>x {selectedMoviePrices[filterMovie.idMovie]?.ticketPrice / ticketPrice} tickets</p>
                <p>a las {selectedMoviePrices[filterMovie.idMovie]?.hour} horas</p>
                <p>combo nº {selectedMoviePrices[filterMovie.idMovie]?.comboNumber ?? 0}</p>
                <p>total {selectedMoviePrices[filterMovie.idMovie]?.ticketPrice != null
                ? selectedMoviePrices[filterMovie.idMovie]?.ticketPrice + (selectedMoviePrices[filterMovie.idMovie]?.comboPrice ?? 0)
                : 0} €</p>
              </div>
            ) : null}

           </div>
        ))}

        <div className="flex justify-center gap-3 mb-2">
          <h3 className="text-white shadow-lg rounded-md border border-slate-500 p-1">Total {totalPrice}€</h3>
          <a href={web ? web : "https://cine.entradas.com/"} className={totalPrice === 0 ? "text-white shadow-lg p-1 bg-slate-500 hover:bg-slate-400 rounded-md font-semibold w-20 text-center":"text-white shadow-lg p-1 bg-slate-500 hover:bg-slate-400 rounded-md font-semibold w-20 text-center"} target="_blank">Comprar</a>
        </div>
      </div>
      
    </div>
  );
}

export default FilmsInTheaters;
