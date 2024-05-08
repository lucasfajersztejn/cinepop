import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";

function MoviesCarrousel() {
  const [movies, setMovies] = useState([]);
  const [cinemas, setCinemas] = useState([])

  useEffect(() => {
    async function fetchMovies() {
      const { data: movies } = await getMovies();
      setMovies(movies);
    }

    fetchMovies();
  }, []);

  const moviesFiltered = movies.slice(0,20)

  return (
    <div className="mt-40 lg:mt-44 xl:mt-48 mx-[5%]">
    <Carousel
      className="my-3"
      autoPlay={true}
      infiniteLoop={true}
      showIndicators={false}
      showThumbs={false}
      showStatus={false}
    >
      {moviesFiltered.map((movie) => (
        <div>
        <img
          className="rounded-3xl shadow-lg"
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt={`poster of ${movie.title}`}
        />
        </div>
      ))}
    </Carousel>
    </div>
  )
}

export default MoviesCarrousel;