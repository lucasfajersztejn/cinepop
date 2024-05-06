import CastCards from "./cast-card";
import "./movie-details.css"

function MovieDetails({ movie }) {
  return (
    <>
      <section className="">        
        <img className="w-full h-auto" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="background image"/>


        <ul className="flex gap-1 flex-wrap text-sm mt-4">
          {movie.genre_ids.map((genre) => (
            <li className="rounded-full px-2 bg-red-600 hover:bg-red-400 text-white" key={genre}>{genre}</li>
          ))}
        </ul>

        <img className="" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="background image"/>
           
        <div>
          <div className="">
            <h4><u>Fecha de estreno</u></h4>
            <p>{movie.release_date}</p>
          </div>

          <div className="">
            <h4><u>Director</u></h4>
            <p>{movie.director.name}</p>
          </div>

          <div className="">
            <h4><u>Calificación</u></h4>
            <p>{movie.certification? "+"+movie.certification : '+12'}</p>
          </div>

          <div className="">
            <h4><u>Duración</u></h4>
            <p>{movie.runTime} mins</p>
          </div>
        </div>

        <div>
            
              
            <div id="default-carousel" className="relative w-full" data-carousel="slide">
              
                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                  <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    {movie.cast.map((actor) => (
                      <div>
                        <img src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`} alt={`photo of ${actor.name}`} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
                        <span className='font-bold'>{actor.name}</span>
                        <span className='font-normal'>{actor.character}</span>
                      </div>
                    ))}
                  </div>
                </div>
              

              <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
              </div>

              <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg className="w-4 h-4 text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                  </svg>
                  <span className="sr-only">Previous</span>
                </span>
              </button>
              <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg className="w-4 h-4 text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="sr-only">Next</span>
                </span>
              </button>
            </div>
            
        </div>
      
      </section>
    </>
  )
}

export default MovieDetails;