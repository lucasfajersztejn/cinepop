import CastCards from "./cast-card";
import "./movie-details.css";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function MovieDetails({ movie }) {
  return (
    <>
      <section className="">
        <img
          className="w-full h-auto"
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt="background image"
        />

        <ul className="flex gap-1 flex-wrap text-sm mt-4">
          {movie.genre_ids.map((genre) => (
            <li
              className="rounded-full px-2 bg-red-600 hover:bg-red-400 text-white"
              key={genre}
            >
              {genre}
            </li>
          ))}
        </ul>
        <div className="relative image_youtube_section w-48">
          <img
            className="w-full"
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt="background image"
          />
          <span className="hidden">
            <p>Hola me llamo cristian</p>
            <a>Pulsame</a>
          </span>
        </div>
        <div>
          <div className="">
            <h4>
              <u>Fecha de estreno</u>
            </h4>
            <p>{movie.release_date}</p>
          </div>

          <div className="">
            <h4>
              <u>Director</u>
            </h4>
            <p>{movie.director.name}</p>
          </div>

          <div className="">
            <h4>
              <u>Calificación</u>
            </h4>
            <p>{movie.certification ? "+" + movie.certification : "+12"}</p>
          </div>

          <div className="">
            <h4>
              <u>Duración</u>
            </h4>
            <p>{movie.runTime} mins</p>
          </div>
        </div>

        <div className="">
          <h3 className="text-2xl">
            <u>Casting:</u>
          </h3>
          <Carousel
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
          </Carousel>
        </div>
      </section>
    </>
  );
}

export default MovieDetails;
