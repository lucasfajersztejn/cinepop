import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { getMovies } from "../../../services/api.service";

function MoviesCarrousel() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const { data: movies } = await getMovies();
        setMovies(movies);
      } catch(error) {
        console.error(error)
      }
    }
    fetchMovies();
  }, []);

  const targetDate = new Date("2024-04-15");
  const endDate = new Date("2024-05-15");
  const moviesFiltered = movies.filter((movie) => {
    const releaseDate = new Date(movie.release_date);

    return releaseDate >= targetDate && releaseDate <= endDate;
  })

  return (
    <div className="">
      
      {moviesFiltered.map((movie) => (

        <div key={movie.id} className="flex flex-wrap sm:flex-row gap-0 items-center my-3 rounded-3xl bg-slate-500"> 
          <div className="w-[50%] md:w-[30%] lg:w-[15%] flex flex-col justify-center py-5 ps-5"> 
            <img
              className="rounded-3xl shadow-lg min-w-[216px] min-h-[325px] aspect-auto object-cover"
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={`poster of ${movie.title}`}
            />
          </div>

          <div className="w-full sm:w-[60%] order-2 sm:-order-none flex flex-col justify-start sm:justify-between gap-3 py-5 text-sm sm:text-lg relative"> 
            <h3 className="text-lg">{movie.title}</h3>
            <p className="line-clamp-2">{movie.overview}</p>

            <div>
              <p>Duración: {movie.runTime}</p>
              <ul>
                {movie.genre_ids.map((genre) => (
                  <li>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
          

          <div>
            <p>Director: {movie.director.name}</p>
            <ul> Actors:
              <li>{movie.cast[0].name}</li>
              <li>{movie.cast[1].name}</li>
              <li>{movie.cast[2].name}...</li>
            </ul>
            <p>Clasificación: +{movie.certification !== "" ? movie.certification : "12"}</p>
          </div>

        </div>
        
        ))}      
      
      
      
      {/* <Carousel
        className="my-3 flex flex-col justify-center items-center"
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
      >
        {moviesFiltered.map((movie) => (
          <div key={movie.id} className="flex flex-col rounded-3xl">
            <img
              className="rounded-3xl shadow-lg"
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={`poster of ${movie.title}`}
            />

            <span className="text-lg">{movie.title}</span>
          </div>
        ))}
        
      </Carousel> */}
    </div>
  )
}

export default MoviesCarrousel;