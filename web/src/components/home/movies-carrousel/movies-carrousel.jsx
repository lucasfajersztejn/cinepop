import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { getMovies } from "../../../services/api.service";
import { Link } from "react-router-dom";
import loadingImg from "../../../assets/loaders/loader_claqueta.gif"

function MoviesCarrousel() {
  const [movies, setMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const { data: movies } = await getMovies();
        setMovies(movies);
        setIsLoading(false)
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

  const handleLessMovies = () => {
    setVisibleMovies(prev => prev - 5);
  }

  return (
    <div className="">
      {isLoading ? (
        <img src={loadingImg} alt="Loading image" />
      ) : (

      <div className="mx-[5%]">
      {moviesFiltered.slice(0, visibleMovies).map((movie) => (

        <div key={movie.id} className="flex flex-wrap lg:min-h-[455px] lg:max-h-[502px] lg:flex-nowrap gap-0 lg:gap-12 items-center mt-3 mb-5 rounded-3xl bg-slate-500"> 
          <div className=""> 
            <img
              className="rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none lg:w-96 lg:min-h-[455px] shadow-lg object-cover "
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={`poster of ${movie.title}`}
            />
          </div>

          <div className="w-full mx-5 lg:mx-0 lg:w-[60%] lg:-order-none flex flex-col justify-start lg:justify-between gap-3 py-5 text-lg lg:text-lg relative"> 
            <h3 className="text-base text-center lg:text-start lg:text-2xl uppercase text-white font-black max-w-fit lg:max-w-[50%]">{movie.title}</h3>
            <p className="line-clamp-2 text-white text-base">{movie.overview}</p>

            <div>
              <hr className="mb-1"/>
              <ul className="flex flex-col items-center lg:flex-row gap-0 lg:gap-5 uppercase text-white text-base font-semibold">
                <p className="">Duración: {movie.runTime} mins</p>
                {movie.genre_ids.map((genre, index) => (
                  <li className="" key={index}>{genre}</li>
                ))}
              </ul>
              <hr className="mt-1"/>
            </div>
          </div>
          
{/**/}
          <div className="uppercase w-full border-t border-dashed border-separate lg:border-l lg:border-t-0 h-[100%]  rounded-b-3xl lg:rounded-e-3xl lg:rounded-bl-none lg:w-[30%] lg:min-h-[455px] 2xl:h-[474px] gap-10 lg:gap-4 xl:gap-10  flex flex-col items-center lg:justify-center text-lg p-4 bg-slate-700 text-white">
            <p className="text-xl text-center"><box-icon name='camera-movie' color='#ffffff' ></box-icon> <u className="font-semibold">Director :</u> {movie.director.name}</p>
            <ul className="text-lg"><box-icon name='star' color="#ffffff"></box-icon> <u className=" text-xl font-semibold">Artistas :</u>
              <li>{movie.cast[0].name}</li>
              <li>{movie.cast[1].name}</li>
              <li>{movie.cast[2].name}...</li>
            </ul>
            <p className="text-xl"><box-icon name='group' color="#ffffff"></box-icon> <u className="font-semibold">Clasificación :</u> +{movie.certification !== "" ? movie.certification : "12"}</p>
            <div className="bg-red-500 shadow-lg rounded-md text-center p-2 hover:bg-red-400 hover:text-black hover:font-bold">
              <Link className=" " to={`/movies/${movie.id}`}>MÁS INFORMACIÓN</Link>
            </div>
          </div>

        </div>
        ))}

        <div className="flex justify-center gap-5 md:gap-0 mb-5">
          {visibleMovies <= moviesFiltered.length && (
            <button className="bg-red-500 shadow-lg text-white px-4 py-2 sm:mx-20 w-[50%] rounded-md mt-4 hover:bg-red-400 hover:text-black hover:font-bold" onClick={handleLoadMoreMovies}>MÁS PELÍCULAS</button>
          )}
          {visibleMovies > 5 && (
            <button className="bg-red-500 shadow-lg text-white px-4 py-2 sm:mx-20 w-[50%] rounded-md mt-4 hover:bg-red-400 hover:text-black hover:font-bold" onClick={handleLessMovies}>MENOS PELÍCULAS</button>
          )} 
        </div>         
      </div>
      )}
    </div>
  )
}

export default MoviesCarrousel;