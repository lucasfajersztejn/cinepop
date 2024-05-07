import { Link } from "react-router-dom";

function MovieItem({ movie }) {
  return (
    <>
      <Link className="relative dark:bg-red-950  w-full rounded-3xl min-h-[340px] md:col-span-2 p-1 group overflow-hidden" to={`/movies/${movie.id}`}>
        <figure className="w-full rounded-3xl h-2/3 overflow-hidden">
          <img className=" w-full h-full sm:min-h-[400px]  md:min-h-[450px] lg:min-h-[450px] object-cover group-hover:scale-105 group-hover:brightness-110 transition-all duration-300" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="movie poster" loading="lazy" />
        </figure>
        
        <div className="p-6">
          <h3 className="font-bold text-lg ">{movie.original_title}</h3>
          <p className="line-clamp-3 mt-4">{movie.overview}</p>
          <ul className="flex gap-1 flex-wrap text-sm mt-4">
            {movie.genre_ids.map((genre, index) => (
              <li key={index} className="rounded-full px-2 bg-gray-300 hover:bg-slate-400">{genre}</li>
            ))}
          </ul>
        </div>

        <span className="absolute bottom-[30%] left-2 backdrop-blur-md bg-teal-600/50 py-1 px-2 rounded-full z-10 text-sm font-semibold text-white ">
          {movie.certification? "+"+movie.certification : '+12'}
        </span>
      </Link>   

      
        {/* <Link class="relative bg-dark-100 shadow dark:shadow-primary-50/10 dark:bg-dark-900 w-full rounded-3xl min-h-[340px] md:col-span-2 p-1 group overflow-hidden" href="/projects/web-colraices">
          <figure class="w-full rounded-3xl overflow-hidden">
            <img class="w-full h-full min-h-[232px] object-cover group-hover:scale-105 group-hover:brightness-110 transition-all duration-300" src="/images/colraices/cover.webp" alt="Web Colraices" loading="lazy" />
          </figure>
          <div class="p-6">
            <h1 class="font-bold text-lg text-primary-700 dark:text-primary-400">Web Colraices</h1>
            <p class="line-clamp-3 mt-4 text-dark-700 dark:text-dark-200">Colraices es una empresa con más de 17 años en el mercado Colombiano, tras la pandemía, los directivos deciden hacer un cambio de la identidad corporativa e imagen de marca, a partir de allí se empieza la planeación del cambio del imagen del sitio web de la empresa.</p>
            <ul class="flex gap-1 flex-wrap text-sm mt-4">
              <li class="rounded-full px-2 border-dark-200 dark:border-dark-800 bg-dark-300/60 dark:bg-primary-900/30 backdrop-blur-sm text-dark-700 dark:text-dark-200"> NextJS</li>
              <li class="rounded-full px-2 border-dark-200 dark:border-dark-800 bg-dark-300/60 dark:bg-primary-900/30 backdrop-blur-sm text-dark-700 dark:text-dark-200"> ReactJS</li>
              <li class="rounded-full px-2 border-dark-200 dark:border-dark-800 bg-dark-300/60 dark:bg-primary-900/30 backdrop-blur-sm text-dark-700 dark:text-dark-200"> SASS</li>
              <li class="rounded-full px-2 border-dark-200 dark:border-dark-800 bg-dark-300/60 dark:bg-primary-900/30 backdrop-blur-sm text-dark-700 dark:text-dark-200"> JavaScript</li>
              <li class="rounded-full px-2 border-dark-200 dark:border-dark-800 bg-dark-300/60 dark:bg-primary-900/30 backdrop-blur-sm text-dark-700 dark:text-dark-200"> HTML</li>
            </ul>
          </div><span class="absolute top-4 left-4 backdrop-blur-md bg-dark-600/50 py-1 px-2 rounded-full z-10 text-sm font-semibold text-dark-100 ">Frontend</span>
        </Link>      */}
      </>
  );
}

export default MovieItem