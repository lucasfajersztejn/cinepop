import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { getMovies } from "../../../services/api.service";
import { Link } from "react-router-dom";

function MoviesCarrousel() {
  const [movies, setMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState(5);

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

  const handleLoadMoreMovies = () => {
    setVisibleMovies(prev => prev + 5);
  }

  return (
    <div className="">
      
      {moviesFiltered.slice(0, visibleMovies).map((movie) => (

        <div key={movie.id} className=" flex flex-wrap lg:min-h-[455px] lg:max-h-[502px] sm:flex-nowrap gap-0 sm:gap-3 lg:gap-12 items-center my-3 rounded-3xl bg-slate-500"> 
          <div className=""> 
            <img
              className="rounded-t-3xl sm:rounded-l-3xl sm:rounded-tr-none w-96 sm:min-h-[455px] shadow-lg object-cover "
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={`poster of ${movie.title}`}
            />
          </div>

          <div className="w-full mx-5 sm:mx-0 sm:w-[60%] sm:-order-none flex flex-col justify-start sm:justify-between gap-3 py-5 text-sm sm:text-lg relative"> 
            <h3 className="text-base text-center sm:text-start sm:text-2xl uppercase text-white font-black max-w-fit sm:max-w-[50%]">{movie.title}</h3>
            <p className="line-clamp-2 text-white text-base">{movie.overview}</p>

            <div>
              <hr className="mb-1"/>
              <ul className="flex flex-col items-center sm:flex-row gap-0 sm:gap-5 uppercase text-white text-base font-semibold">
                <p className="">Duración: {movie.runTime} mins</p>
                {movie.genre_ids.map((genre) => (
                  <li className="">{genre}</li>
                ))}
              </ul>
              <hr className="mt-1"/>
            </div>
          </div>
          

          <div className="uppercase w-full border-t border-dashed border-separate sm:border-l sm:border-t-0 sm:w-1/2 lg:h-[455px] rounded-b-3xl sm:rounded-e-3xl sm:rounded-bl-none md:w-[25%] lg:w-[30%] gap-10 lg:gap-8 xl:gap-10 flex flex-col items-center lg:justify-center text-sm p-4 bg-slate-700 text-white">
            <p className="text-xl "><box-icon name='camera-movie' color='#ffffff' ></box-icon> <u className="font-semibold">Director:</u> {movie.director.name}</p>
            <ul className="text-lg"><box-icon name='star' color="#ffffff"></box-icon> <u className=" text-xl font-semibold">Actors :</u>
              <li>{movie.cast[0].name}</li>
              <li>{movie.cast[1].name}</li>
              <li>{movie.cast[2].name}...</li>
            </ul>
            <p className="text-xl"><box-icon name='group' color="#ffffff"></box-icon> <u className="font-semibold">Clasificación:</u> +{movie.certification !== "" ? movie.certification : "12"}</p>
            <Link className=" bg-red-500 shadow-lg rounded-md text-center pt-2 lg:w-1/2 lg:h-8 hover:bg-red-300 hover:text-black hover:font-semibold" to={`/movies/${movie.id}`}>MÁS INFORMACIÓN</Link>
          </div>

             
        </div>
          
        ))}

          {visibleMovies <= moviesFiltered.length && (
            <button className="bg-red-500 shadow-lg text-white px-4 py-2 mx-[25%] w-[50%] rounded-md mt-4" onClick={handleLoadMoreMovies}>MÁS PELÍCULAS</button>
          )}            
      
      
      
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