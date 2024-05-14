import { useEffect, useState } from "react";
import Map from "../../google/map/map";
import { Navigate } from "react-router-dom";

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
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [weekDay, setWeekDay] = useState("");
  const [availableHours, setAvailableHours] = useState([]);
  const [isCombo, setIsCombo] = useState(false)

  useEffect(() => {
    //   const fetchData = async () => {
    setIsLoading(false);

    //     const sortedMovies = movies.slice().sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    //     setSortedMovies(sortedMovies);

    //     if (filteredMovies.length > 0) {
    //       const onlyHours = filteredMovies.map((movie) => movie.timesheets.filter((object) => object.idCinema === id));
    //       const schedules = onlyHours.map((hour) => hour.map((hourInsSchedule) => hourInsSchedule.schedules));
    //       const allDays = Object.keys(schedules[0][0]);
    //       setSchedules(schedules);
    //       setWeekDays(allDays)
    //     }

    //     setIsLoading(!isLoading);
    // };

    //   fetchData();
  }, [movies, id, priority]);

  const targetDate = new Date("2024-03-15");
  const endDate = new Date("2024-05-15");
  const filteredMovies = movies.filter((movie) => {
    const releaseDate = new Date(movie.release_date);
    return (
      priority === 1 && releaseDate >= targetDate && releaseDate <= endDate
    );
  });
  // setMoviesFiltered(filteredMovies);
  // console.log(filteredMovies)

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
    setIsCombo(prev => !prev)
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
            </div>

            <div className="flex flex-col gap-2 p-3 justify-start border border-slate-500 bg-slate-800/70 rounded-xl">
              <h2 className="text-white font-semibold underline text-xl lg:text-2xl">
                {name}
              </h2>
              <p className="text-white text-lg lg:text-xl">{description}</p>
            </div>
          </div>


          <div className="flex flex-col gap-2 p-3 justify-start border border-slate-500 bg-slate-800/70 rounded-xl mt-4">

              <div className="bg-slate-400 p-2 rounded-lg flex flex-wrap  sm:flex-row gap-2 md:gap-4 justify-center items-center">

                <span className="text-white font-normal text-lg underline">Día:</span>
                <select onClick={handleDays} className="text-center rounded-xl p-1 font-semibold ring-2 ring-red-500">
                  <option value="monday" defaultValue>Lunes</option>
                  <option value="tuesday">Martes</option>
                  <option value="wednesday">Miércoles</option>
                  <option value="thursday">Jueves</option>
                  <option value="friday">Viernes</option>
                  <option value="saturday">Sábado</option>
                  <option value="sunday">Domingo</option>
                </select>


                <span className="text-white font-normal text-lg underline">Combo: </span>
                <input type="checkbox" onClick={handleCombo} className="text-center rounded-xl p-4   font-semibold ring-2 ring-red-500" />
       
              
                {isCombo && ( 
                <div>
                  <span className="text-white font-normal text-lg underline me-3">combos:</span>
                  <select className="appearance-none text-center rounded-xl p-1 font-semibold ring-2 ring-red-500">
                    <option value="1">combo 1</option>
                    <option value="2">combo 2</option>
                    <option value="3">combo 3</option>
                    <option value="4">combo 4</option>
                  </select>
                </div>
                )}
              
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
                    
                    <h2 className="text-white font-semibold text-2xl">{filterMovie.title}</h2>
                    <p className="text-white text-lg">{filterMovie.overview}</p>

                    <div className="flex flex-wrap gap-2">
                      {availableHours.map((hour, index) => (
                        <span key={index} className="text-white bg-red-500 hover:bg-red-400 rounded-3xl ring-red-300 ring-2 p-2">{hour}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-5 lg:flex-col lg:gap-2 justify-center items-center">
                    <span className="text-white font-medium text-lg">Entradas</span>
                    <input type="number" className="p-2 w-16" min={1}/>
                  </div>

                </div>
              ))}
            </div>


          
        </div>
      )}
    </section>
  );
}

export default CinemaDetails;
