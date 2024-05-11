import CastCards from "./cast-card";
import "./movie-details.css";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";

function MovieDetails({ movie }) {
  const [visibleActors, setVisibleActors] = useState(5);

  const handleLoadMoreActors = () => {
    setVisibleActors(prev => prev + 5);
  }

  const handleLoadLessActors = () => {
    setVisibleActors(prev => prev - 5);
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
        
        <div className="flex flex-col md:flex-row gap-3 mx-3">
          <div className="flex items-center md:flex-col md:items-start gap-2">
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

            <div className="border border-slate-300 w-44 mt-3 shadow-lg bg-slate-600 rounded-xl">
              <div className="">
                <h4 className="text-white font-semibold text-xl ms-1">
                  <u>Fecha de estreno</u>
                </h4>
                <p className="text-white ms-1">{movie.release_date}</p>
              </div>

              <div className="">
                <h4 className="text-white font-semibold text-xl ms-1">
                  <u>Director</u>
                </h4>
                <p className="text-white ms-1">{movie.director.name}</p>
              </div>

              <div className="">
                <h4 className="text-white font-semibold text-xl ms-1">
                  <u>Calificación</u>
                </h4>
                <p className="text-white ms-1">{movie.certification ? "+" + movie.certification : "+12"}</p>
              </div>

              <div className="">
                <h4 className="text-white font-semibold text-xl ms-1">
                  <u>Duración</u>
                </h4>
                <p className="text-white ms-1 mb-1">{movie.runTime} mins</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-2 lg:w-[500px] xl:w-[1000px]">
            <h2 className="text-white font-semibold underline text-xl lg:text-4xl">{movie.title}</h2>
            <h2 className="text-white md:text-lg xl:text-xl">{movie.overview}</h2>

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
                    <span className="text-white text-lg">Papel: {actor.character}</span>
                    
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-5">
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


        <div className="">
          <h3 className="text-2xl">
            <u>Casting:</u>
          </h3>
          {/* <Carousel
            className="my-3"
            autoPlay={true}
            infiniteLoop={true}
            showIndicators={false}
            showThumbs={false}
            showStatus={false}
          >
            {movie.cast.map((actor) => (
              <div key={actor.id} className="flex flex-col rounded-3xl">
                {actor.profile_path ? (
                  <img
                    className="rounded-3xl shadow-lg"
                    src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
                    alt={`photo of ${actor.name}`}
                  />
                ) : (
                  <img
                    className="rounded-3xl shadow-lg max-h-[580px] object-contain"
                    src={`https://wally.walker.co.uk/images/wally-wave.jpg`}
                    alt={`photo of Wally`}
                  />
                )}
                <span className="text-lg">Artista: {actor.name}</span>
                <span className="text-lg">Papel: {actor.character}</span>
              </div>
            ))}
          </Carousel> */}
        </div>
      </section>
    </>
  );
}

export default MovieDetails;
