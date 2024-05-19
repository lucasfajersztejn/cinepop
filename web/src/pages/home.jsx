import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import MoviesCarrousel from "../components/home/movies-carrousel/movies-carrousel";
import CinemasCarrousel from "../components/home/cinemas-carrousel/cinemas-carrousel";

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex flex-col items-center">
      <MoviesCarrousel />
    </div>
  )
}

export default Home;