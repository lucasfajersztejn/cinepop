import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import MoviesCarrousel from "../components/home/movies-carrousel/movies-carrousel";
import CinemasCarrousel from "../components/home/cinemas-carrousel/cinemas-carrousel";

function Home() {
  const [movies, setMovies] = useState([]);
  const [cinemas, setCinemas] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="mt-40 lg:mt-44 xl:mt-48 mx-[5%]">
      <MoviesCarrousel />
      <CinemasCarrousel />
    </div>
  )
}

export default Home;