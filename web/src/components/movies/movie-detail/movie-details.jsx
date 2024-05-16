import CastCards from "./cast-card";
import "./movie-details.css";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useContext, useState } from "react";
import AuthContext from "../../../context/auth.context";
import { useNavigate } from "react-router-dom";
import { deleteMovie } from "../../../services/api.service";
import EditMovie from "./edit-movie";

function MovieDetails({ movie }) {
  const { user } = useContext(AuthContext)
  const [visibleActors, setVisibleActors] = useState(5);
  const [visibleEdit, setVisibleEdit] = useState(true);
  const navigate = useNavigate();

  const handleLoadMoreActors = () => {
    setVisibleActors(prev => prev + 5);
  }

  const handleLoadLessActors = () => {
    setVisibleActors(prev => prev - 5);
  }

  const handleVisibleEdit = () => {
    setVisibleEdit(prev => !prev);
  }

  const handleDeleteMovie = async () => {
    try {
      await deleteMovie(movie.id);
      navigate("/movies")
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <>
      <section className="">
        <div className="relative bg-cover bg-center h-28 md:h-40 lg:h-64 xl:h-96 opacity-[40%] rounded-t-xl" style={{backgroundImage:`url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`}}></div>
             
        <div className="relative">
          <ul className="flex gap-1 text-xs mt-1 md:absolute md:bottom-2 md:left-2">
            {movie.genre_ids.map((genre) => (
              <li
                className="rounded-full px-2 bg-red-600  hover:bg-red-400 text-white "
                key={genre}
              >
                {genre}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3 mx-3 mt-3 md:mt-0">
          <div className={`flex ${user ? "flex-wrap justify-center" : ""} items-center md:justify-normal md:flex-col md:items-start gap-2`}>
            <div className="relative image_youtube_section w-32 md:w-44 md:mt-5 shadow-lg">
              <img
                className="w-full rounded-xl"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt="background image"
              />
              <a className=""  target="_blank" href={`https://www.youtube.com/watch?v=${movie.youtube_key}`}>
                <span className="hidden">
                  <p>TRAILER</p>
                  <box-icon name='play-circle' animation='tada' color='#ffffff' ></box-icon>
                </span>
              </a>
            </div>

            <div className="border border-slate-300 w-44 mt-3 shadow-lg bg-slate-600 rounded-xl p-2">
              <div className="">
                <h4 className="text-white text-lg  ms-1">
                  <u>Fecha de estreno</u>
                </h4>
                <p className="text-white font-semibold text-xl ms-1">{movie.release_date}</p>
              </div>

              <div className="">
                <h4 className="text-white text-lg ms-1">
                  <u>Director</u>
                </h4>
                <p className="text-white font-semibold text-xl ms-1">{movie.director.name}</p>
              </div>

              <div className="">
                <h4 className="text-white text-lg ms-1">
                  <u>Calificación</u>
                </h4>
                <p className="text-white font-semibold text-xl ms-1">{movie.certification ? "+" + movie.certification : "+12"}</p>
              </div>

              <div className="">
                <h4 className="text-white text-lg ms-1">
                  <u>Duración</u>
                </h4>
                <p className="text-white font-semibold text-xl ms-1 mb-1">{movie.runTime} mins</p>
              </div>
            </div>
            
            {user &&
            <div className="border h-24 gap-3 border-slate-300 w-44 mt-3 shadow-lg bg-slate-600 rounded-xl flex flex-col justify-center items-center">
              <button className="text-white bg-red-500 shadow-lg px-4 py-1 rounded-md" onClick={handleDeleteMovie}>Borrar película</button>
              <button className="text-white bg-red-500 shadow-lg px-4 py-1 rounded-md" onClick={handleVisibleEdit}>Editar película</button>
            </div>
            }
          </div>

          <div className="flex flex-col gap-2 lg:w-full xl:w-full mt-5">
            
            {visibleEdit &&
            <div className="border border-slate-400 bg-slate-800 rounded-xl p-4">
              <h2 className="text-white font-semibold underline text-xl lg:text-4xl mb-3">{movie.title}</h2>
              <h2 className="text-white md:text-lg xl:text-xl">{movie.overview}</h2>
            </div>
            }

            {!visibleEdit && <EditMovie movie={movie}/>}
            
            <div className="border border-slate-400 bg-slate-800 rounded-xl">
              <div className="md:flex flex-wrap justify-center items-center">
                {movie.cast.slice(0, visibleActors).map((actor, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 md:ms-5 mt-2">
                    <img
                      className="md:rounded-xl shadow-lg h-32 p-1"
                      src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
                      alt={`photo of ${actor.name}`}
                    />
                    <span className="text-white text-lg">{actor.name}</span>
                    <span className="text-white text-lg">{actor.character}</span>
                    
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-5 my-2">
                {visibleActors <= movie.cast.length && (
                  <button className="text-white bg-red-500 shadow-lg px-4 py-1 rounded-md" onClick={handleLoadMoreActors}>Más artistas</button>
                )}
                {visibleActors > 5 && (
                  <button className="text-white bg-red-500 shadow-lg px-4 py-1 rounded-md" onClick={handleLoadLessActors}>Menos artistas</button>
                )}
              </div>
            </div>
          </div>

        </div>

      </section>
    </>
  );
}

export default MovieDetails;
