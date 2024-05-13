import { useEffect, useState } from "react";
import Map from "../../google/map/map";
import { Navigate } from "react-router-dom";

function CinemaDetails({ name, movieTheaters, description, web, avatar, bgAvatar, phoneNumber, address, id, priority, movies }) {
  const [isLoading, setIsLoading] = useState(true);
  // const [sortedMovies, setSortedMovies] = useState([]);
  // const [moviesFiltered, setMoviesFiltered] = useState([]);
  // const [schedules, setSchedules] = useState([]);
  // const [weekDays, setWeekDays] = useState([]);

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
      return priority === 1 && releaseDate >= targetDate && releaseDate <= endDate
    });
    // setMoviesFiltered(filteredMovies);

  const filterMovies = filteredMovies.map((movie) => movie.timesheets.filter((timesheet) => timesheet.idCinema === id))
  // console.log(filterMovies)

  const allSchedules = filterMovies.flatMap(movie =>
    movie.map(timesheet =>
      timesheet.schedules
    )
  );
  console.log(allSchedules)
  
  
  return (
    <section>
    {isLoading ? (
      <p>cargando...</p>
    ) : (
      <div>
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

            <div>
              {/* {moviesFiltered.map((movie) => (
                <div className="text-white" key={movie.id}>
                  {movie.release_date + " - " + movie.title}
                  <ul>

                    {Object.keys(movie.schedules).map((day) => (
                      <li key={day}>
                        <strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong>
                        <ul>

                          {movie.schedules[day].map((time, index) => (
                            <li key={index}>{time}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              ))} */}
            </div>
          </div>
        </div>
      </div>
    )}
      

    </section>
  )
}

export default CinemaDetails;